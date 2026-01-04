#!/bin/bash

# メンター専用リポジトリのセットアップスクリプト
# 使用方法: ./setup-mentor-repo.sh <新リポジトリ名> <新リポジトリのパス>

set -e

REPO_NAME=${1:-"bootcamp-v2-mentor"}
REPO_PATH=${2:-"../${REPO_NAME}"}

echo "🚀 メンター専用リポジトリのセットアップを開始します..."
echo "リポジトリ名: ${REPO_NAME}"
echo "リポジトリパス: ${REPO_PATH}"

# 元のリポジトリのパスを取得（スクリプトの場所から）
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
BOOTCAMP_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"

echo "元のリポジトリ: ${BOOTCAMP_ROOT}"

# 新リポジトリのディレクトリを作成
mkdir -p "${REPO_PATH}"
cd "${REPO_PATH}"

# Gitリポジトリを初期化
if [ ! -d ".git" ]; then
    git init
    echo "✅ Gitリポジトリを初期化しました"
else
    echo "⚠️  既存のGitリポジトリが見つかりました"
fi

# ディレクトリ構造を作成
mkdir -p docs
mkdir -p materials

echo "📋 ファイルをコピー中..."

# メンター向けドキュメントをコピー
if [ -f "${BOOTCAMP_ROOT}/docs/mentor-guide.md" ]; then
    cp "${BOOTCAMP_ROOT}/docs/mentor-guide.md" docs/
    echo "✅ mentor-guide.md をコピーしました"
fi

if [ -f "${BOOTCAMP_ROOT}/docs/mentor-quick-start.md" ]; then
    cp "${BOOTCAMP_ROOT}/docs/mentor-quick-start.md" docs/
    echo "✅ mentor-quick-start.md をコピーしました"
fi

# 料金関係のドキュメントをコピー
if [ -f "${BOOTCAMP_ROOT}/materials/pricing-sheet.md" ]; then
    cp "${BOOTCAMP_ROOT}/materials/pricing-sheet.md" materials/
    echo "✅ pricing-sheet.md をコピーしました"
fi

if [ -f "${BOOTCAMP_ROOT}/materials/promotional-material.md" ]; then
    cp "${BOOTCAMP_ROOT}/materials/promotional-material.md" materials/
    echo "✅ promotional-material.md をコピーしました"
fi

if [ -f "${BOOTCAMP_ROOT}/docs/tools-and-costs.md" ]; then
    cp "${BOOTCAMP_ROOT}/docs/tools-and-costs.md" docs/
    echo "✅ tools-and-costs.md をコピーしました"
fi

# READMEを作成
cat > README.md << 'EOF'
# Bootcamp v2 - メンター専用リポジトリ

このリポジトリには、研修生からは見せないメンター専用ドキュメントと料金関係のドキュメントを管理しています。

## 📁 ディレクトリ構造

```
.
├── docs/
│   ├── mentor-guide.md          # メンター用運用ガイド
│   ├── mentor-quick-start.md    # メンター向けクイックスタート
│   └── tools-and-costs.md       # ツールと費用一覧
├── materials/
│   ├── pricing-sheet.md         # 料金表
│   └── promotional-material.md  # 広告資料
└── README.md
```

## 🔐 アクセス制御

このリポジトリは**メンターと管理者のみ**がアクセスできます。

- プライベートリポジトリとして設定してください
- GitHubのリポジトリ設定で、適切なチームにアクセス権限を付与してください

## 📝 使用方法

1. このリポジトリをクローン
2. 必要に応じてドキュメントを更新
3. 変更をコミット・プッシュ

## 🔗 関連リポジトリ

- [bootcamp-v2](https://github.com/honeycome-bootcamp/bootcamp-v2) - メインの研修リポジトリ（公開）

## 📚 ドキュメント

### メンター向け

- [メンター向けクイックスタート](docs/mentor-quick-start.md) - **最初に読む**
- [メンター用運用ガイド](docs/mentor-guide.md) - 詳細な運用ガイド

### 料金・営業資料

- [料金表](materials/pricing-sheet.md) - 基本コース料金、割引制度など
- [広告資料](materials/promotional-material.md) - 営業・セールス用資料
- [ツールと費用一覧](docs/tools-and-costs.md) - 研修で使用するツールの費用情報

---

**注意**: このリポジトリの内容は研修生には公開されません。
EOF

echo "✅ README.md を作成しました"

# .gitignoreを作成
cat > .gitignore << 'EOF'
# OS
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/
*.swp
*.swo
*~

# Temporary files
*.tmp
*.log
EOF

echo "✅ .gitignore を作成しました"

echo ""
echo "✨ セットアップが完了しました！"
echo ""
echo "次のステップ:"
echo "1. GitHubで新しいプライベートリポジトリを作成: ${REPO_NAME}"
echo "2. リモートリポジトリを追加:"
echo "   cd ${REPO_PATH}"
echo "   git remote add origin https://github.com/honeycome-bootcamp/${REPO_NAME}.git"
echo "3. ファイルをコミット・プッシュ:"
echo "   git add ."
echo "   git commit -m 'Initial commit: メンター専用ドキュメント'"
echo "   git push -u origin main"
echo ""
echo "4. 元のリポジトリ（bootcamp-v2）のREADME.mdを更新して、"
echo "   このリポジトリへのリンクを追加してください"
