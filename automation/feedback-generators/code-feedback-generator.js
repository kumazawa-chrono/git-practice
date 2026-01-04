const fs = require('fs');
const path = require('path');

/**
 * コードのフィードバックを生成するクラス
 */
class CodeFeedbackGenerator {
  constructor() {
    this.patterns = [
      {
        name: 'エラーハンドリング漏れ',
        regex: /fetch\([^)]+\)\s*;?\s*(?!.*\.ok)/,
        suggestion: 'fetchの結果は`response.ok`をチェックしてください。エラーハンドリングを追加しましょう。',
        severity: 'warning'
      },
      {
        name: 'any型の使用',
        regex: /:\s*any\b/,
        suggestion: '`any`型の使用は避け、具体的な型を指定してください。TypeScriptの型安全性を活用しましょう。',
        severity: 'warning'
      },
      {
        name: 'console.logの残留',
        regex: /console\.log\(/,
        suggestion: 'デバッグ用の`console.log`は削除してください。本番コードには残さないようにしましょう。',
        severity: 'info'
      },
      {
        name: '未使用の変数',
        regex: /const\s+(\w+)\s*=\s*[^;]+;\s*(?!.*\1)/,
        suggestion: '未使用の変数は削除するか、使用するように修正してください。',
        severity: 'info'
      },
      {
        name: '非同期処理のawait漏れ',
        regex: /(fetch|axios\.|\.then\(|Promise\.)/,
        suggestion: '非同期処理の結果を適切に`await`で待機するか、`.then()`で処理してください。',
        severity: 'warning'
      }
    ];
  }

  /**
   * ファイルを解析してフィードバックを生成
   */
  analyzeFile(filePath) {
    if (!fs.existsSync(filePath)) {
      return [];
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const feedbacks = [];
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      for (const pattern of this.patterns) {
        if (pattern.regex.test(line)) {
          feedbacks.push({
            line: i + 1,
            pattern: pattern.name,
            suggestion: pattern.suggestion,
            severity: pattern.severity,
            code: line.trim()
          });
        }
      }
    }

    return feedbacks;
  }

  /**
   * ディレクトリ内のファイルを解析
   */
  analyzeDirectory(dirPath, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
    const feedbacks = [];
    
    if (!fs.existsSync(dirPath)) {
      return feedbacks;
    }

    const files = this.getFilesRecursively(dirPath, extensions);
    
    for (const file of files) {
      const fileFeedbacks = this.analyzeFile(file);
      feedbacks.push(...fileFeedbacks.map(f => ({
        ...f,
        file: path.relative(dirPath, file)
      })));
    }

    return feedbacks;
  }

  /**
   * 再帰的にファイルを取得
   */
  getFilesRecursively(dirPath, extensions) {
    const files = [];
    
    try {
      const items = fs.readdirSync(dirPath);
      
      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          // node_modulesや.gitをスキップ
          if (item !== 'node_modules' && item !== '.git') {
            files.push(...this.getFilesRecursively(fullPath, extensions));
          }
        } else if (stat.isFile()) {
          const ext = path.extname(item);
          if (extensions.includes(ext)) {
            files.push(fullPath);
          }
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dirPath}:`, error);
    }
    
    return files;
  }

  /**
   * フィードバックをMarkdown形式で生成
   */
  generateMarkdown(feedbacks, options = {}) {
    if (feedbacks.length === 0) {
      return '## ✅ コードレビュー\n\n特に問題は見つかりませんでした！';
    }

    let markdown = '## 📝 コードレビュー\n\n';
    
    // 重要度でグループ化
    const bySeverity = {
      warning: feedbacks.filter(f => f.severity === 'warning'),
      info: feedbacks.filter(f => f.severity === 'info')
    };

    if (bySeverity.warning.length > 0) {
      markdown += '### ⚠️ 改善提案\n\n';
      for (const feedback of bySeverity.warning) {
        markdown += `**${feedback.file}** (${feedback.line}行目)\n`;
        markdown += `- ${feedback.suggestion}\n`;
        markdown += `\`\`\`\n${feedback.code}\n\`\`\`\n\n`;
      }
    }

    if (bySeverity.info.length > 0) {
      markdown += '### 💡 ヒント\n\n';
      for (const feedback of bySeverity.info) {
        markdown += `**${feedback.file}** (${feedback.line}行目)\n`;
        markdown += `- ${feedback.suggestion}\n\n`;
      }
    }

    return markdown;
  }
}

module.exports = CodeFeedbackGenerator;
