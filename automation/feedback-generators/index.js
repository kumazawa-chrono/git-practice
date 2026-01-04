const CodeFeedbackGenerator = require('./code-feedback-generator');
const TestFeedbackGenerator = require('./test-feedback-generator');
const fs = require('fs');
const path = require('path');

/**
 * フィードバック生成システムのメインエントリーポイント
 */
class FeedbackGenerator {
  constructor(options = {}) {
    this.codeGenerator = new CodeFeedbackGenerator();
    this.testGenerator = new TestFeedbackGenerator();
    this.options = options;
  }

  /**
   * コードレビューとテスト結果からフィードバックを生成
   */
  async generateFeedback(targetPath, options = {}) {
    const results = {
      codeFeedback: null,
      testFeedback: null,
      combined: null
    };

    // コードレビュー
    if (options.analyzeCode !== false) {
      const codeFeedbacks = this.codeGenerator.analyzeDirectory(targetPath);
      results.codeFeedback = this.codeGenerator.generateMarkdown(codeFeedbacks);
    }

    // テスト実行とフィードバック
    if (options.runTests !== false) {
      const testResult = this.testGenerator.runTests(targetPath, {
        cwd: path.dirname(targetPath) || process.cwd()
      });
      const testFeedback = this.testGenerator.generateFeedback(testResult);
      results.testFeedback = this.testGenerator.generateMarkdown(testFeedback);
    }

    // 統合フィードバック
    results.combined = this.combineFeedback(results.codeFeedback, results.testFeedback);

    return results;
  }

  /**
   * コードレビューとテスト結果を統合
   */
  combineFeedback(codeFeedback, testFeedback) {
    let combined = '# 🤖 自動フィードバック\n\n';

    if (testFeedback) {
      combined += testFeedback + '\n\n';
    }

    if (codeFeedback) {
      combined += codeFeedback + '\n\n';
    }

    combined += '---\n';
    combined += '💡 **ヒント**: このフィードバックは自動生成されています。';
    combined += ' より詳細なレビューが必要な場合は、メンターに質問してください。\n';

    return combined;
  }

  /**
   * フィードバックをファイルに保存
   */
  saveFeedback(feedback, outputPath) {
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, feedback, 'utf8');
    return outputPath;
  }
}

// コマンドライン実行時の処理
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('使用方法: node index.js <target-path> [options]');
    console.error('例: node index.js exercises/common/01-git-basics');
    process.exit(1);
  }

  const targetPath = args[0];
  const generator = new FeedbackGenerator();
  
  generator.generateFeedback(targetPath)
    .then(results => {
      console.log('✅ フィードバック生成完了');
      console.log('\n=== 統合フィードバック ===\n');
      console.log(results.combined);
      
      // ファイルに保存
      const outputPath = path.join(targetPath, 'feedback.md');
      generator.saveFeedback(results.combined, outputPath);
      console.log(`\n📄 フィードバックを保存しました: ${outputPath}`);
    })
    .catch(error => {
      console.error('❌ エラー:', error);
      process.exit(1);
    });
}

module.exports = FeedbackGenerator;
