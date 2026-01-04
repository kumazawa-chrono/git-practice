const fs = require('fs');
const { execSync } = require('child_process');

/**
 * テスト結果からフィードバックを生成するクラス
 */
class TestFeedbackGenerator {
  constructor() {
    this.errorPatterns = {
      'TypeError': {
        message: '型エラーが発生しています。変数の型を確認してください。',
        link: '/content/common/02-programming-fundamentals'
      },
      'ReferenceError': {
        message: '未定義の変数や関数を参照しています。変数名のスペルミスやスコープを確認してください。',
        link: '/content/common/02-programming-fundamentals'
      },
      'SyntaxError': {
        message: '構文エラーが発生しています。括弧やセミコロンが正しく閉じられているか確認してください。',
        link: '/content/common/02-programming-fundamentals'
      },
      'AssertionError': {
        message: 'テストのアサーションが失敗しています。期待値と実際の値が一致しているか確認してください。',
        link: '/content/common/04-testing'
      }
    };
  }

  /**
   * テストを実行して結果を取得
   */
  runTests(testPath, options = {}) {
    try {
      const command = options.command || 'npm test';
      const cwd = options.cwd || process.cwd();
      
      const output = execSync(command, {
        cwd,
        encoding: 'utf8',
        stdio: 'pipe'
      });
      
      return {
        success: true,
        output,
        errors: []
      };
    } catch (error) {
      return {
        success: false,
        output: error.stdout || error.stderr || error.message,
        errors: this.parseErrors(error.stdout || error.stderr || error.message)
      };
    }
  }

  /**
   * エラーメッセージを解析
   */
  parseErrors(errorOutput) {
    const errors = [];
    const lines = errorOutput.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // エラータイプを検出
      for (const [errorType, info] of Object.entries(this.errorPatterns)) {
        if (line.includes(errorType)) {
          errors.push({
            type: errorType,
            message: info.message,
            link: info.link,
            line: i + 1,
            context: lines.slice(Math.max(0, i - 2), Math.min(lines.length, i + 3)).join('\n')
          });
        }
      }
    }
    
    return errors;
  }

  /**
   * フィードバックを生成
   */
  generateFeedback(testResult, options = {}) {
    if (testResult.success) {
      return {
        status: 'success',
        message: '✅ すべてのテストが通過しました！素晴らしいです。',
        details: []
      };
    }

    const feedback = {
      status: 'failure',
      message: '❌ テストが失敗しました。以下の点を確認してください。',
      details: []
    };

    // エラーごとにフィードバックを生成
    for (const error of testResult.errors) {
      feedback.details.push({
        type: error.type,
        message: error.message,
        link: error.link,
        suggestion: this.getSuggestion(error.type)
      });
    }

    // エラーが見つからない場合の汎用フィードバック
    if (feedback.details.length === 0) {
      feedback.details.push({
        type: 'Unknown',
        message: 'エラーの詳細を確認してください。',
        suggestion: '1. エラーメッセージをよく読む\n2. 該当するコンテンツを見直す\n3. それでも解決しない場合はSlackで質問する'
      });
    }

    return feedback;
  }

  /**
   * エラータイプに応じた提案を取得
   */
  getSuggestion(errorType) {
    const suggestions = {
      'TypeError': [
        '変数の型を確認してください',
        'TypeScriptの型定義を見直してください',
        '`typeof`や`instanceof`で型チェックを追加してください'
      ],
      'ReferenceError': [
        '変数名のスペルミスがないか確認してください',
        '変数のスコープ（`let`, `const`, `var`）を確認してください',
        '関数の定義位置を確認してください'
      ],
      'SyntaxError': [
        '括弧`()`, `[]`, `{}`が正しく閉じられているか確認してください',
        'セミコロン`;`が適切に配置されているか確認してください',
        '文字列の引用符が正しく閉じられているか確認してください'
      ],
      'AssertionError': [
        '期待値と実際の値が一致しているか確認してください',
        'テストケースの条件を再確認してください',
        'ロジックの実装を見直してください'
      ]
    };

    return suggestions[errorType] || ['エラーの原因を特定して修正してください'];
  }

  /**
   * Markdown形式でフィードバックを生成
   */
  generateMarkdown(feedback) {
    let markdown = `## ${feedback.status === 'success' ? '✅' : '❌'} テスト結果\n\n`;
    markdown += `${feedback.message}\n\n`;

    if (feedback.details.length > 0) {
      markdown += '### 詳細\n\n';
      
      for (const detail of feedback.details) {
        markdown += `#### ${detail.type}\n\n`;
        markdown += `${detail.message}\n\n`;
        
        if (detail.suggestion) {
          if (Array.isArray(detail.suggestion)) {
            markdown += '**確認ポイント:**\n';
            detail.suggestion.forEach((s, i) => {
              markdown += `${i + 1}. ${s}\n`;
            });
          } else {
            markdown += `**提案:** ${detail.suggestion}\n`;
          }
          markdown += '\n';
        }
        
        if (detail.link) {
          markdown += `📚 関連コンテンツ: [こちら](${detail.link})\n\n`;
        }
      }
    }

    markdown += '---\n';
    markdown += '💬 質問があれば Slack で聞いてください！\n';

    return markdown;
  }
}

module.exports = TestFeedbackGenerator;
