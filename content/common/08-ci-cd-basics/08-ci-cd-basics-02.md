# GitHub Actions

## 📋 概要

| 項目 | 内容 |
|------|------|
| 所要時間 | 45分 |
| 難易度 | [基礎] |
| 前提知識 | CI/CDの概念 |

## 🎯 なぜこれを学ぶのか

GitHub ActionsはGitHubに統合されたCI/CDツールで、追加の設定なしでCI/CDを始められます。

## 📚 学習内容

### 1. 基本構造

```yaml
# .github/workflows/ci.yml
name: CI                          # ワークフロー名

on: [push, pull_request]          # トリガー

jobs:                             # ジョブの定義
  test:                           # ジョブ名
    runs-on: ubuntu-latest        # 実行環境
    steps:                        # ステップ
      - uses: actions/checkout@v4 # アクション
      - run: npm install          # コマンド
      - run: npm test
```

### 2. トリガー（on）

```yaml
# プッシュ時
on: push

# 複数イベント
on: [push, pull_request]

# ブランチ指定
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

# 定期実行（cron）
on:
  schedule:
    - cron: '0 0 * * *'  # 毎日0時

# 手動実行
on: workflow_dispatch
```

### 3. ジョブとステップ

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # アクションを使用
      - uses: actions/checkout@v4
      
      # Node.jsセットアップ
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      # コマンド実行
      - run: npm ci
      - run: npm run build
      
      # 複数行のコマンド
      - run: |
          echo "Building..."
          npm run build
          echo "Done!"
```

### 4. 環境変数とシークレット

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      NODE_ENV: production
    steps:
      - run: echo $NODE_ENV
      
      # シークレットの使用
      - run: echo ${{ secrets.API_KEY }}
        env:
          API_KEY: ${{ secrets.API_KEY }}
```

### 5. マトリックスビルド

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm test
```

### 6. ジョブの依存関係

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: npm run build

  test:
    needs: build  # buildの後に実行
    runs-on: ubuntu-latest
    steps:
      - run: npm test

  deploy:
    needs: [build, test]  # 両方の後に実行
    runs-on: ubuntu-latest
    steps:
      - run: npm run deploy
```

### 7. 条件分岐

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'  # mainブランチのみ
    steps:
      - run: npm run deploy
```

### 8. キャッシュ

```yaml
steps:
  - uses: actions/cache@v4
    with:
      path: ~/.npm
      key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
      restore-keys: |
        ${{ runner.os }}-npm-
```

### 9. 実践的な例

```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm test

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build
      - run: npm run deploy
        env:
          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```

## ✅ まとめ

| 概念 | ポイント |
|------|---------|
| ワークフロー | YAMLで定義 |
| トリガー | push, PR, schedule等 |
| ジョブ | 実行単位 |
| ステップ | 個々のタスク |

## 🔗 次のコンテンツ

[自動テスト](08-ci-cd-basics-03.md)に進んでください。

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../docs/terms-of-use.md)をご覧ください。
