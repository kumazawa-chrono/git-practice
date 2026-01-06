# 課題2: マルチコンテナWebアプリ

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐⭐ |
| 所要時間 | 60分 |
| 前提知識 | Docker Compose基礎 |

## 🎯 目標

フロントエンド、バックエンド、データベースの3層構成のアプリケーションをDocker Composeで構築する。

## 📝 課題内容

### アーキテクチャ

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Frontend   │───▶│   Backend    │───▶│   Database   │
│   (React)    │    │  (Node.js)   │    │ (PostgreSQL) │
│   :3000      │    │   :3001      │    │   :5432      │
└──────────────┘    └──────────────┘    └──────────────┘
```

### Step 1: ディレクトリ構造の作成

```
exercise-02/
├── compose.yaml
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       └── index.html
└── backend/
    ├── Dockerfile
    ├── package.json
    └── src/
        └── index.js
```

### Step 2: バックエンドの作成

**backend/package.json**:
```json
{
  "name": "backend",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.11.3"
  }
}
```

**backend/src/index.js**:
```javascript
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3001;

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'myapp',
});

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'healthy', database: 'connected' });
  } catch (error) {
    res.status(503).json({ status: 'unhealthy', error: error.message });
  }
});

app.get('/api/time', async (req, res) => {
  const result = await pool.query('SELECT NOW() as time');
  res.json({ time: result.rows[0].time });
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
```

**backend/Dockerfile**を作成してください:
- ベースイメージ: `node:18-alpine`
- 作業ディレクトリ: `/app`
- `package.json`をコピーして`npm install`
- ソースコードをコピー
- ポート`3001`を公開
- `npm start`で起動

### Step 3: フロントエンドの作成

**frontend/src/index.html**:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Exercise 02</title>
</head>
<body>
  <h1>Docker Compose Exercise</h1>
  <div id="status">Loading...</div>
  <div id="time"></div>
  <script>
    async function fetchData() {
      try {
        const healthRes = await fetch('/api/health');
        const health = await healthRes.json();
        document.getElementById('status').textContent = 
          `Status: ${health.status}, DB: ${health.database}`;
        
        const timeRes = await fetch('/api/time');
        const time = await timeRes.json();
        document.getElementById('time').textContent = `Server time: ${time.time}`;
      } catch (error) {
        document.getElementById('status').textContent = `Error: ${error.message}`;
      }
    }
    fetchData();
    setInterval(fetchData, 5000);
  </script>
</body>
</html>
```

**frontend/Dockerfile**を作成してください:
- ベースイメージ: `nginx:alpine`
- `src/index.html`を`/usr/share/nginx/html/`にコピー

### Step 4: compose.yamlの作成

以下の要件を満たす`compose.yaml`を作成してください:

**要件**:

1. **dbサービス**
   - PostgreSQL 15
   - 環境変数でユーザー/パスワード/DB名を設定
   - ボリュームでデータを永続化
   - ヘルスチェックを設定

2. **backendサービス**
   - `./backend`からビルド
   - ポート: `3001:3001`
   - 環境変数でDB接続情報を設定
   - `db`に依存（ヘルスチェック完了後に起動）

3. **frontendサービス**
   - `./frontend`からビルド
   - ポート: `3000:80`
   - Nginxでリバースプロキシ設定（`/api/*`を`backend:3001`に転送）
   - `backend`に依存

### Step 5: Nginxリバースプロキシ設定

**frontend/nginx.conf**を作成:
```nginx
server {
    listen 80;
    
    location / {
        root /usr/share/nginx/html;
        index index.html;
    }
    
    location /api/ {
        proxy_pass http://backend:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Dockerfileでこの設定ファイルもコピーしてください。

## ✅ 完了条件

- [ ] `docker compose up -d --build` でエラーなく起動
- [ ] `http://localhost:3000` でフロントエンドが表示される
- [ ] 画面にDB接続ステータスとサーバー時刻が表示される
- [ ] `docker compose down -v` で正常に停止

## 💡 ヒント

<details>
<summary>ヘルスチェック付きdepends_on</summary>

```yaml
services:
  backend:
    depends_on:
      db:
        condition: service_healthy
```

</details>

<details>
<summary>PostgreSQLのヘルスチェック</summary>

```yaml
healthcheck:
  test: ["CMD-SHELL", "pg_isready -U admin"]
  interval: 5s
  timeout: 5s
  retries: 5
```

</details>

## 📤 提出物

- `exercise-02/compose.yaml`
- `exercise-02/backend/Dockerfile`
- `exercise-02/backend/package.json`
- `exercise-02/backend/src/index.js`
- `exercise-02/frontend/Dockerfile`
- `exercise-02/frontend/nginx.conf`
- `exercise-02/frontend/src/index.html`

## 🔗 参考

- [マルチコンテナ構成](../11-container-advanced-04.md)

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../../docs/terms-of-use.md)をご覧ください。
