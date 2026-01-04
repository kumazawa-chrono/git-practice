const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * 実践課題のテストを実行するクラス
 */
class ExerciseTestRunner {
  constructor(options = {}) {
    this.options = {
      timeout: options.timeout || 30000, // 30秒
      verbose: options.verbose || false,
      ...options
    };
  }

  /**
   * 課題ディレクトリのテストを実行
   */
  async runExerciseTests(exercisePath) {
    if (!fs.existsSync(exercisePath)) {
      return {
        success: false,
        error: `課題ディレクトリが見つかりません: ${exercisePath}`
      };
    }

    const results = {
      exercisePath,
      packageJson: null,
      testResults: null,
      lintResults: null,
      typeCheckResults: null
    };

    // package.jsonの確認
    const packageJsonPath = path.join(exercisePath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      results.packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    }

    // テスト実行
    if (results.packageJson && results.packageJson.scripts && results.packageJson.scripts.test) {
      try {
        results.testResults = await this.runCommand('npm test', exercisePath);
      } catch (error) {
        results.testResults = {
          success: false,
          error: error.message,
          output: error.stdout || error.stderr
        };
      }
    }

    // Lint実行
    if (results.packageJson && results.packageJson.scripts && results.packageJson.scripts.lint) {
      try {
        results.lintResults = await this.runCommand('npm run lint', exercisePath);
      } catch (error) {
        results.lintResults = {
          success: false,
          error: error.message,
          output: error.stdout || error.stderr
        };
      }
    }

    // 型チェック実行
    if (results.packageJson && results.packageJson.scripts && results.packageJson.scripts['type-check']) {
      try {
        results.typeCheckResults = await this.runCommand('npm run type-check', exercisePath);
      } catch (error) {
        results.typeCheckResults = {
          success: false,
          error: error.message,
          output: error.stdout || error.stderr
        };
      }
    }

    // 全体の成功判定
    results.success = 
      (!results.testResults || results.testResults.success) &&
      (!results.lintResults || results.lintResults.success) &&
      (!results.typeCheckResults || results.typeCheckResults.success);

    return results;
  }

  /**
   * コマンドを実行
   */
  async runCommand(command, cwd) {
    try {
      const output = execSync(command, {
        cwd,
        encoding: 'utf8',
        stdio: this.options.verbose ? 'inherit' : 'pipe',
        timeout: this.options.timeout
      });

      return {
        success: true,
        output
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        output: error.stdout || error.stderr || error.message,
        code: error.status || error.code
      };
    }
  }

  /**
   * 複数の課題を一括実行
   */
  async runMultipleExercises(exercisePaths) {
    const results = [];
    
    for (const exercisePath of exercisePaths) {
      const result = await this.runExerciseTests(exercisePath);
      results.push(result);
    }

    return results;
  }

  /**
   * 結果をサマリー形式で出力
   */
  generateSummary(results) {
    const summary = {
      total: results.length,
      passed: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      details: results.map(r => ({
        path: r.exercisePath,
        success: r.success,
        hasTests: !!r.testResults,
        hasLint: !!r.lintResults,
        hasTypeCheck: !!r.typeCheckResults
      }))
    };

    return summary;
  }

  /**
   * 結果をMarkdown形式で出力
   */
  generateMarkdownReport(results) {
    let markdown = '# テスト実行レポート\n\n';
    markdown += `実行日時: ${new Date().toISOString()}\n\n`;

    const summary = this.generateSummary(results);
    markdown += `## サマリー\n\n`;
    markdown += `- 総数: ${summary.total}\n`;
    markdown += `- ✅ 成功: ${summary.passed}\n`;
    markdown += `- ❌ 失敗: ${summary.failed}\n\n`;

    markdown += `## 詳細\n\n`;
    
    for (const result of results) {
      const status = result.success ? '✅' : '❌';
      markdown += `### ${status} ${path.basename(result.exercisePath)}\n\n`;
      
      if (result.testResults) {
        markdown += `**テスト**: ${result.testResults.success ? '✅ 通過' : '❌ 失敗'}\n`;
        if (!result.testResults.success && result.testResults.output) {
          markdown += `\`\`\`\n${result.testResults.output.substring(0, 500)}\n\`\`\`\n`;
        }
      }
      
      if (result.lintResults) {
        markdown += `**Lint**: ${result.lintResults.success ? '✅ 通過' : '❌ 失敗'}\n`;
      }
      
      if (result.typeCheckResults) {
        markdown += `**型チェック**: ${result.typeCheckResults.success ? '✅ 通過' : '❌ 失敗'}\n`;
      }
      
      markdown += '\n';
    }

    return markdown;
  }
}

// コマンドライン実行時の処理
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('使用方法: node exercise-test-runner.js <exercise-path> [exercise-path2 ...]');
    console.error('例: node exercise-test-runner.js exercises/common/01-git-basics');
    process.exit(1);
  }

  const runner = new ExerciseTestRunner({ verbose: true });
  
  if (args.length === 1) {
    // 単一の課題
    runner.runExerciseTests(args[0])
      .then(result => {
        console.log(JSON.stringify(result, null, 2));
        process.exit(result.success ? 0 : 1);
      })
      .catch(error => {
        console.error('❌ エラー:', error);
        process.exit(1);
      });
  } else {
    // 複数の課題
    runner.runMultipleExercises(args)
      .then(results => {
        const report = runner.generateMarkdownReport(results);
        console.log(report);
        
        const summary = runner.generateSummary(results);
        process.exit(summary.failed > 0 ? 1 : 0);
      })
      .catch(error => {
        console.error('❌ エラー:', error);
        process.exit(1);
      });
  }
}

module.exports = ExerciseTestRunner;
