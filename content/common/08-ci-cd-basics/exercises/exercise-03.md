# 課題3: CI/CDパイプライン

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐⭐⭐ |
| 所要時間 | 60分 |

## 🎯 目標

テスト→ビルド→デプロイの完全なパイプラインを構築する。

## 📝 課題内容

### 静的サイトプロジェクト

Viteプロジェクトを作成:

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

### 課題3-1: 完全なCI/CDパイプライン

`.github/workflows/cicd.yml`:

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
      - run: npm test -- --run

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      
      # ビルド成果物をアップロード
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: dist/

  deploy:
    needs: build
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v4
        with:
          name: dist
          path: dist/
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 課題3-2: PRステータスチェック

リポジトリ設定でブランチ保護を設定:
1. Settings → Branches
2. Add branch protection rule
3. Branch name pattern: `main`
4. Require status checks to pass
5. `test`ジョブを必須に

### 課題3-3: デプロイ通知（発展）

デプロイ成功時にSlackに通知するステップを追加してください（シミュレーションでOK）。

```yaml
- name: Notify Slack
  if: success()
  run: |
    echo "Deployed to: https://${{ github.repository_owner }}.github.io/${{ github.event.repository.name }}/"
    # curl でSlack Webhookに送信（実際のWebhook URLがあれば）
```

## ✅ 完了条件

- [ ] テスト→ビルド→デプロイのパイプラインが動作する
- [ ] PRでテストが必須になっている
- [ ] mainブランチへのプッシュでデプロイされる
