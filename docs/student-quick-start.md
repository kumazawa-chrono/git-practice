# 研修生向けクイックスタート

## 🚀 研修開始までの4ステップ（30分〜1時間）

### Step 1: 環境構築

以下のツールをインストールしてください：

| ツール | バージョン | インストール方法 |
|--------|-----------|------------------|
| Git | 最新版 | [git-scm.com](https://git-scm.com/) |
| Node.js | v18以上 | [nodejs.org](https://nodejs.org/) |
| Cursor | 最新版 | [cursor.sh](https://cursor.sh/) |
| Docker | 最新版 | [docker.com](https://www.docker.com/) |

インストール確認：
```bash
git --version    # git version 2.x.x
node --version   # v18.x.x以上
docker --version # Docker version 2x.x.x
```

### Step 2: リポジトリのクローン

```bash
git clone https://github.com/honeycome-bootcamp/bootcamp-v2.git
cd bootcamp-v2
```

### Step 3: 進捗管理フォルダの作成

`{your-name}` をあなたの名前（ローマ字）に置き換えてください：

```bash
mkdir -p progress/students/{your-name}
cp progress/templates/progress-template.md progress/students/{your-name}/progress.md
```

> 💡 **重要**: 進捗ファイルは毎日更新してください。モチベーション監視システムが自動で分析します。

### Step 4: 学習開始

📁 **最初のコンテンツ**: [content/common/00-engineer-mindset/README.md](../content/common/00-engineer-mindset/README.md)

## 📝 1つのカテゴリの学習手順

### Day 1: インプット（1-2時間）

```
1. 📖 README.mdを読む（カテゴリの概要を把握）
2. 📖 各コンテンツを順番に読む
3. 📝 わからないところをメモ
4. ✅ 理解度チェックテストに挑戦
```

### Day 2以降: アウトプット（2-4時間）

```
1. 📖 content/内のexercises/で課題の説明を確認
2. 📁 exercises/配下で課題に取り組む（コードを書く）
3. 🧪 理解度チェックテストを実行（tests/配下）
4. 🔄 テストを実行して確認
5. 📤 PRを作成して提出
6. 👀 レビューを受けて修正
```

## 📤 PR提出の流れ

### 1. ブランチ作成

```bash
git checkout main
git pull origin main
git checkout -b student/{your-name}/common/01-git-basics
```

### 2. 課題に取り組む

`exercises/[コース]/[カテゴリ]/` 配下で課題に取り組みます。

### 3. コミット & プッシュ

```bash
git add .
git commit -m "feat: Git基礎の実践課題を完了"
git push origin student/{your-name}/common/01-git-basics
```

### 4. PR作成

GitHubでPull Requestを作成します。

### 5. 自動処理の確認

PR作成後、以下が自動実行されます：

- ✅ **自動テスト**: テスト、Lint、型チェックが実行されます
- ✅ **自動ラベル**: コース名、カテゴリ名が自動付与されます
- ✅ **自動アサイン**: メンターが自動でアサインされます
- ✅ **自動フィードバック**: テスト失敗時、ヒントがコメントされます

### 6. レビュー待ち

- ✅ 緑のチェック: テスト通過 → メンターレビューを待つ
- ❌ 赤いバツ: テスト失敗 → エラーを確認して修正

### 7. PRマージ後

- ✅ **進捗自動更新**: 進捗ファイルが自動で更新されます
- ✅ **次のカテゴリへ**: 進捗を確認して次に進みましょう

## 💡 自動化システムの活用

### 自動テスト

PR作成時に自動で実行されます。エラーがあれば、PRコメントで確認できます。

### 自動フィードバック

テスト失敗時、自動でヒントがコメントされます。まずはそれを確認してください。

### 進捗自動更新

PRマージ後、`progress/students/{your-name}/progress.md` が自動で更新されます。

### モチベーション監視

毎日の自己診断を記入すると、自動で分析されます。低下や停滞が検出されると、メンターにアラートが送られます。

## 🆘 困ったときは

### 質問の仕方

1. 公式ドキュメントを読む（10分）
2. ググる（10分）
3. エラーメッセージを読む（自動フィードバックを確認）
4. GitHub Discussionsで質問（30分悩んだら）

### よくあるトラブル

| トラブル | 解決法 |
|----------|--------|
| テストが通らない | ✅ 自動フィードバックを確認 |
| Lintエラー | ✅ PRコメントで自動表示 |
| 型エラー | ✅ PRコメントで自動表示 |
| 課題の意味がわからない | コンテンツを読み直す、Discussionsで質問 |

## 📚 関連ドキュメント

- [研修生向けガイド](student-guide.md) - 詳細な学習ガイド
- [カリキュラム概要](curriculum-overview.md) - 学習内容の全体像

---

**準備完了**: 上記の準備が完了したら、学習を開始してください！🚀
