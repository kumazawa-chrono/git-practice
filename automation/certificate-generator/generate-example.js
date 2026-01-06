const CertificateGenerator = require('./certificate-generator');
const ReportGenerator = require('./report-generator');
const fs = require('fs');
const path = require('path');

/**
 * サンプルデータを作成
 */
function createSampleData() {
  return {
    basicInfo: {
      studentName: '山田 太郎',
      mentorName: '佐藤 花子',
      startDate: '2024-01-15'
    },
    course: 'web',
    completionDate: '2024-06-30',
    categories: [
      { name: 'HTML/CSS基礎', isCompleted: true, status: '完了', completionDate: '2024-02-15' },
      { name: 'JavaScript基礎', isCompleted: true, status: '完了', completionDate: '2024-03-20' },
      { name: 'React基礎', isCompleted: true, status: '完了', completionDate: '2024-04-25' },
      { name: 'Node.js基礎', isCompleted: true, status: '完了', completionDate: '2024-05-30' },
      { name: 'データベース基礎', isCompleted: true, status: '完了', completionDate: '2024-06-15' }
    ],
    testResults: [
      { category: 'HTML/CSS基礎', date: '2024-02-15', result: '合格', score: { percentage: 85 } },
      { category: 'JavaScript基礎', date: '2024-03-20', result: '合格', score: { percentage: 90 } },
      { category: 'React基礎', date: '2024-04-25', result: '合格', score: { percentage: 88 } },
      { category: 'Node.js基礎', date: '2024-05-30', result: '合格', score: { percentage: 82 } },
      { category: 'データベース基礎', date: '2024-06-15', result: '合格', score: { percentage: 75 } }
    ],
    prStatistics: {
      total: 25,
      merged: 23,
      averageReviewTime: 2.5,
      resubmissionCount: 2
    },
    oneOnOneMemos: [
      {
        date: '2024-02-01',
        motivation: '高い',
        feedback: 'HTML/CSSの基礎がしっかりと身についており、良いスタートを切れています。コーディング規約も意識できています。'
      },
      {
        date: '2024-03-15',
        motivation: '高い',
        feedback: 'JavaScriptの理解が深まってきました。非同期処理の概念もしっかりと理解できています。'
      },
      {
        date: '2024-04-20',
        motivation: '普通',
        feedback: 'Reactの学習が進んでいます。コンポーネント設計の考え方が少しずつ身についてきています。'
      },
      {
        date: '2024-05-25',
        motivation: '高い',
        feedback: 'Node.jsのバックエンド開発も順調に進んでいます。API設計の理解が向上しています。'
      },
      {
        date: '2024-06-20',
        motivation: '高い',
        feedback: 'データベース設計も理解できており、全体的にバランスの取れた学習ができています。'
      }
    ],
    selfAssessments: [
      { date: '2024-02-01', motivation: 5, difficulty: 3, energy: 4 },
      { date: '2024-03-15', motivation: 5, difficulty: 3, energy: 5 },
      { date: '2024-04-20', motivation: 4, difficulty: 4, energy: 4 },
      { date: '2024-05-25', motivation: 5, difficulty: 3, energy: 5 },
      { date: '2024-06-20', motivation: 5, difficulty: 2, energy: 5 }
    ],
    capstoneEvaluation: {
      theme: 'タスク管理アプリケーション',
      repository: 'https://github.com/yamada-taro/task-manager-app',
      deployUrl: 'https://task-manager-app.vercel.app',
      scores: {
        'コード品質': { score: 'A', comment: '可読性が高く、適切な設計パターンが使われています。' },
        '機能実装': { score: 'A', comment: '要件を満たす機能が実装されています。' },
        'UI/UX': { score: 'B+', comment: '使いやすいUIですが、レスポンシブデザインの改善の余地があります。' },
        'テスト': { score: 'B', comment: '基本的なテストは実装されていますが、カバレッジを上げる必要があります。' },
        'ドキュメント': { score: 'A', comment: 'READMEが充実しており、セットアップ手順が明確です。' }
      }
    }
  };
}

/**
 * 例を生成
 */
function generateExamples() {
  const sampleData = createSampleData();
  const outputDir = path.join(__dirname, '../../github/samples');
  
  // 出力ディレクトリを作成
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 修了証を生成
  console.log('修了証の例を生成しています...');
  const certGenerator = new CertificateGenerator(sampleData);
  const certMarkdown = certGenerator.generateMarkdown();
  const certHtml = certGenerator.generateHTML();
  
  fs.writeFileSync(
    path.join(outputDir, 'certificate-example.md'),
    certMarkdown,
    'utf8'
  );
  fs.writeFileSync(
    path.join(outputDir, 'certificate-example.html'),
    certHtml,
    'utf8'
  );
  console.log('✅ 修了証の例を生成しました: github/samples/certificate-example.md, github/samples/certificate-example.html');

  // レポートを生成
  console.log('評価レポートの例を生成しています...');
  const reportGenerator = new ReportGenerator(sampleData);
  const report = reportGenerator.generate();
  
  fs.writeFileSync(
    path.join(outputDir, 'report-example.md'),
    report,
    'utf8'
  );
  console.log('✅ 評価レポートの例を生成しました: github/samples/report-example.md');

  console.log('\n✅ すべての例の生成が完了しました！');
}

// 実行
if (require.main === module) {
  generateExamples();
}

module.exports = { generateExamples, createSampleData };
