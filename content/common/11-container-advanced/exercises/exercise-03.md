# 課題3: 本番運用を意識した構成

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐⭐⭐ |
| 所要時間 | 90分 |
| 前提知識 | マルチコンテナ構成 |

## 🎯 目標

課題2のアプリケーションを、本番運用を意識した構成に改善する。

## 📝 課題内容

### 改善ポイント

```
開発環境                          本番環境
┌─────────────────┐              ┌─────────────────┐
│ ホットリロード   │              │ マルチステージビルド │
│ デバッグポート   │      →      │ 非rootユーザー     │
│ ボリュームマウント│              │ ヘルスチェック     │
│                 │              │ リソース制限       │
└─────────────────┘              └─────────────────┘
```

### Step 1: Dockerfileの最適化

**backend/Dockerfile**を以下の要件で改善:

1. **マルチステージビルド**
   - ビルドステージ: 依存関係のインストール
   - 実行ステージ: 最小限のファイルのみコピー

2. **非rootユーザー**
   - `node`ユーザーで実行

3. **最適化**
   - `npm ci --only=production`を使用
   - 不要なファイルを含めない

```dockerfile
# 期待する構造
# ビルドステージ
FROM node:18-alpine AS builder
# ... 依存関係のインストール

# 実行ステージ  
FROM node:18-alpine
# ... 非rootユーザー設定
# ... 最小限のファイルをコピー
```

### Step 2: 環境別のCompose設定

以下のファイル構成を作成:

```
exercise-03/
├── compose.yaml           # 共通設定
├── compose.override.yaml  # 開発環境（自動読み込み）
├── compose.prod.yaml      # 本番環境
├── .env.example           # 環境変数サンプル
└── ...
```

**compose.yaml（共通）**:
```yaml
services:
  backend:
    build:
      context: ./backend
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:15-alpine
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 5s
      timeout: 5s
      retries: 5
```

**compose.override.yaml（開発）の要件**:
- バックエンドにボリュームマウント（ホットリロード用）
- デバッグポート`9229`を公開
- `NODE_ENV=development`

**compose.prod.yaml（本番）の要件**:
- リソース制限（CPU: 0.5、メモリ: 512MB）
- 再起動ポリシー: `unless-stopped`
- ログ設定（max-size: 10m、max-file: 3）
- `NODE_ENV=production`
- 読み取り専用ファイルシステム（必要な場所のみtmpfs）

### Step 3: ヘルスチェックの実装

バックエンドに適切なヘルスチェックエンドポイントを実装:

```javascript
// /health エンドポイント
// - DBへの接続確認
// - メモリ使用量
// - 起動時間
app.get('/health', async (req, res) => {
  // 実装してください
});
```

compose.yamlにもヘルスチェック設定を追加:

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3001/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

### Step 4: セキュリティ対策

1. **シークレット管理**
   - `.env`ファイルを使用
   - `.env`は`.gitignore`に追加
   - `.env.example`をサンプルとして提供

2. **ネットワーク分離**
   - フロントエンド用ネットワーク
   - バックエンド用ネットワーク
   - DBはバックエンドネットワークのみ

```yaml
networks:
  frontend:
  backend:

services:
  frontend:
    networks:
      - frontend
  backend:
    networks:
      - frontend
      - backend
  db:
    networks:
      - backend
```

### Step 5: 動作確認

```bash
# 開発環境
docker compose up -d
curl http://localhost:3000

# 本番環境
docker compose -f compose.yaml -f compose.prod.yaml up -d
curl http://localhost:3000

# リソース使用量確認
docker stats

# ログ確認
docker compose logs -f backend

# クリーンアップ
docker compose down -v
```

## ✅ 完了条件

- [ ] マルチステージビルドでイメージサイズが削減されている
- [ ] 非rootユーザーで実行されている
- [ ] 開発環境と本番環境で異なる設定が適用される
- [ ] ヘルスチェックが正常に動作する
- [ ] リソース制限が適用されている
- [ ] ネットワークが分離されている

## 📊 評価ポイント

| 項目 | 配点 |
|------|:----:|
| Dockerfileの最適化 | 30% |
| 環境分離 | 25% |
| ヘルスチェック | 20% |
| セキュリティ | 15% |
| ドキュメント | 10% |

## 💡 ヒント

<details>
<summary>イメージサイズの確認</summary>

```bash
# ビルド前後のサイズを比較
docker images | grep backend
```

</details>

<details>
<summary>実行ユーザーの確認</summary>

```bash
docker compose exec backend whoami
# node と表示されればOK
```

</details>

<details>
<summary>リソース制限の設定</summary>

```yaml
deploy:
  resources:
    limits:
      cpus: '0.5'
      memory: 512M
    reservations:
      cpus: '0.25'
      memory: 256M
```

</details>

## 📤 提出物

- `exercise-03/compose.yaml`
- `exercise-03/compose.override.yaml`
- `exercise-03/compose.prod.yaml`
- `exercise-03/.env.example`
- `exercise-03/backend/Dockerfile`
- `exercise-03/backend/src/index.js`（ヘルスチェック追加版）
- `exercise-03/README.md`（構成の説明）

## 🔗 参考

- [本番運用のベストプラクティス](../11-container-advanced-05.md)

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../../docs/terms-of-use.md)をご覧ください。
