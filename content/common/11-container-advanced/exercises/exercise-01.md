# 課題1: Docker Compose基礎

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐ |
| 所要時間 | 30分 |
| 前提知識 | Docker基礎 |

## 🎯 目標

Docker Composeを使って、NginxとPostgreSQLの2つのコンテナを起動できるようになる。

## 📝 課題内容

### Step 1: 基本的なcompose.yamlの作成

以下の要件を満たす`compose.yaml`を作成してください。

**要件**:

1. **Nginxサービス**
   - イメージ: `nginx:alpine`
   - ポート: ホストの`8080`をコンテナの`80`にマッピング
   - コンテナ名: `web`

2. **PostgreSQLサービス**
   - イメージ: `postgres:15-alpine`
   - 環境変数:
     - `POSTGRES_USER`: `admin`
     - `POSTGRES_PASSWORD`: `password`
     - `POSTGRES_DB`: `myapp`
   - コンテナ名: `db`

### Step 2: 動作確認

```bash
# 起動
docker compose up -d

# 確認
docker compose ps

# Nginxにアクセス
curl http://localhost:8080

# PostgreSQLに接続
docker compose exec db psql -U admin -d myapp -c "SELECT version();"

# 停止
docker compose down
```

## ✅ 完了条件

- [ ] `docker compose up -d` でエラーなく起動する
- [ ] `curl http://localhost:8080` でNginxのウェルカムページが表示される
- [ ] PostgreSQLに接続してクエリが実行できる
- [ ] `docker compose down` で正常に停止する

## 💡 ヒント

<details>
<summary>compose.yamlの基本構造</summary>

```yaml
services:
  サービス名:
    image: イメージ名
    ports:
      - "ホスト:コンテナ"
    environment:
      - 変数名=値
    container_name: コンテナ名
```

</details>

## 📤 提出物

- `exercise-01/compose.yaml`

## 🔗 参考

- [Docker Compose基礎](../11-container-advanced-03.md)

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../../docs/terms-of-use.md)をご覧ください。
