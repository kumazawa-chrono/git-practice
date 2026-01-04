/**
 * Git基礎 - 理解度チェックテスト
 * 自動採点版
 */

const readline = require('readline');

const questions = [
  {
    id: 'q1',
    question: 'Gitの主な目的として最も適切なものはどれですか？',
    options: {
      A: 'ファイルを圧縮する',
      B: 'コードの変更履歴を管理する',
      C: 'プログラムを実行する',
      D: 'ファイルを暗号化する'
    },
    correct: 'B',
    explanation: 'Gitはバージョン管理システムで、コードの変更履歴を管理し、過去の状態に戻したり、複数人での共同開発を可能にします。'
  },
  {
    id: 'q2',
    question: 'コミット（commit）の説明として正しいものはどれですか？',
    options: {
      A: 'ファイルをサーバーにアップロードすること',
      B: '変更を記録したスナップショット',
      C: 'ファイルを削除すること',
      D: 'ブランチを作成すること'
    },
    correct: 'B',
    explanation: 'コミットは、ある時点のファイルの状態を記録したスナップショットです。コミットにはメッセージや作成者の情報も含まれます。'
  },
  {
    id: 'q3',
    question: '新しいGitリポジトリを作成するコマンドはどれですか？',
    options: {
      A: 'git create',
      B: 'git new',
      C: 'git init',
      D: 'git start'
    },
    correct: 'C',
    explanation: '`git init`は現在のディレクトリを新しいGitリポジトリとして初期化します。'
  },
  {
    id: 'q4',
    question: 'ファイルをステージングエリアに追加するコマンドはどれですか？',
    options: {
      A: 'git stage',
      B: 'git add',
      C: 'git commit',
      D: 'git push'
    },
    correct: 'B',
    explanation: '`git add <file>`でファイルをステージングエリアに追加します。`git add .`ですべての変更を追加できます。'
  },
  {
    id: 'q5',
    question: '以下のコマンドの正しい順序はどれですか？',
    options: {
      A: 'commit → add → push',
      B: 'add → push → commit',
      C: 'push → add → commit',
      D: 'add → commit → push'
    },
    correct: 'D',
    explanation: '正しい流れは：1. `git add` - 変更をステージング、2. `git commit` - 変更を記録、3. `git push` - リモートに送信'
  }
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let answers = {};
let currentQuestion = 0;
let score = 0;

function askQuestion() {
  if (currentQuestion >= questions.length) {
    showResults();
    rl.close();
    return;
  }

  const q = questions[currentQuestion];
  console.log(`\n【問題 ${currentQuestion + 1}/${questions.length}】`);
  console.log(q.question);
  console.log('');
  Object.entries(q.options).forEach(([key, value]) => {
    console.log(`  ${key}) ${value}`);
  });
  console.log('');

  rl.question('回答を入力してください (A/B/C/D): ', (answer) => {
    const upperAnswer = answer.toUpperCase().trim();
    if (['A', 'B', 'C', 'D'].includes(upperAnswer)) {
      answers[q.id] = upperAnswer;
      if (upperAnswer === q.correct) {
        score++;
        console.log('✅ 正解！');
      } else {
        console.log(`❌ 不正解。正解は ${q.correct} です。`);
        console.log(`💡 ${q.explanation}`);
      }
      currentQuestion++;
      askQuestion();
    } else {
      console.log('⚠️  A, B, C, D のいずれかを入力してください。');
      askQuestion();
    }
  });
}

function showResults() {
  console.log('\n' + '='.repeat(50));
  console.log('📊 テスト結果');
  console.log('='.repeat(50));
  console.log(`正解数: ${score}/${questions.length}`);
  console.log(`正答率: ${Math.round((score / questions.length) * 100)}%`);
  console.log('');

  if (score >= 12) {
    console.log('✅ 合格！次のカテゴリに進んでください');
  } else if (score >= 9) {
    console.log('⚠️  惜しい！間違えた箇所を復習してください');
  } else {
    console.log('❌ 要復習。コンテンツを読み直してください');
  }

  console.log('\n間違えた問題の復習:');
  questions.forEach((q, index) => {
    if (answers[q.id] !== q.correct) {
      console.log(`\n問題 ${index + 1}: ${q.question}`);
      console.log(`あなたの回答: ${answers[q.id]}`);
      console.log(`正解: ${q.correct}`);
      console.log(`解説: ${q.explanation}`);
    }
  });
}

console.log('Git基礎 - 理解度チェックテスト');
console.log('='.repeat(50));
askQuestion();
