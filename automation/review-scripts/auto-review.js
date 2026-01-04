const fs = require('fs');
const path = require('path');
const CodeFeedbackGenerator = require('../feedback-generators/code-feedback-generator');
const TestFeedbackGenerator = require('../feedback-generators/test-feedback-generator');

/**
 * 自動レビュースクリプト
 * PRのコードを自動レビューしてフィードバックを生成
 */
class AutoReview {
  constructor(options = {}) {
    this.codeGenerator = new CodeFeedbackGenerator();
    this.testGenerator = new TestFeedbackGenerator();
    this.options = options;
  }

  /**
   * PRの変更ファイルをレビュー
   */
  async reviewPR(changedFiles, basePath = process.cwd()) {
    const reviews = [];

    for (const file of changedFiles) {
      const fullPath = path.join(basePath, file);
      
      if (!fs.existsSync(fullPath)) {
        continue;
      }

      // コードレビュー
      const codeFeedbacks = this.codeGenerator.analyzeFile(fullPath);
      
      if (codeFeedbacks.length > 0) {
        reviews.push({
          file,
          type: 'code',
          feedbacks: codeFeedbacks
        });
      }
    }

    return reviews;
  }

  /**
   * レビュー結果をMarkdown形式で生成
   */
  generateReviewMarkdown(reviews) {
    if (reviews.length === 0) {
      return '## ✅ 自動レビュー\n\n特に問題は見つかりませんでした！';
    }

    let markdown = '## 🤖 自動レビュー結果\n\n';

    // ファイルごとにグループ化
    const byFile = {};
    for (const review of reviews) {
      if (!byFile[review.file]) {
        byFile[review.file] = [];
      }
      byFile[review.file].push(...review.feedbacks);
    }

    for (const [file, feedbacks] of Object.entries(byFile)) {
      markdown += `### 📄 ${file}\n\n`;

      // 重要度でソート
      const warnings = feedbacks.filter(f => f.severity === 'warning');
      const infos = feedbacks.filter(f => f.severity === 'info');

      if (warnings.length > 0) {
        markdown += '#### ⚠️ 改善提案\n\n';
        for (const feedback of warnings) {
          markdown += `**${feedback.line}行目**: ${feedback.suggestion}\n`;
          markdown += `\`\`\`\n${feedback.code}\n\`\`\`\n\n`;
        }
      }

      if (infos.length > 0) {
        markdown += '#### 💡 ヒント\n\n';
        for (const feedback of infos) {
          markdown += `**${feedback.line}行目**: ${feedback.suggestion}\n\n`;
        }
      }
    }

    markdown += '---\n';
    markdown += '💡 このレビューは自動生成されています。詳細なレビューが必要な場合は、メンターに質問してください。\n';

    return markdown;
  }

  /**
   * レビュー結果を保存
   */
  saveReview(markdown, outputPath) {
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, markdown, 'utf8');
    return outputPath;
  }
}

// コマンドライン実行時の処理
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('使用方法: node auto-review.js <file1> [file2 ...]');
    console.error('例: node auto-review.js exercises/common/01-git-basics/index.ts');
    process.exit(1);
  }

  const reviewer = new AutoReview();
  
  reviewer.reviewPR(args)
    .then(reviews => {
      const markdown = reviewer.generateReviewMarkdown(reviews);
      console.log(markdown);
      
      // ファイルに保存
      const outputPath = path.join(process.cwd(), 'review-feedback.md');
      reviewer.saveReview(markdown, outputPath);
      console.log(`\n📄 レビュー結果を保存しました: ${outputPath}`);
    })
    .catch(error => {
      console.error('❌ エラー:', error);
      process.exit(1);
    });
}

module.exports = AutoReview;
