# 課題3: Docker Compose

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐⭐⭐ |
| 所要時間 | 60分 |

## 🎯 目標

Docker Composeで複数コンテナを管理する。

## 📝 課題内容

### Node.js + PostgreSQL環境の構築

1. プロジェクト構成

```
compose-app/
├── docker-compose.yml
├── app/
│   ├── Dockerfile
│   ├── package.json
│   └── index.js
└── db/
    └── init.sql
```

2. `app/index.js`

```javascript
const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.json({ time: result.rows[0].now });
});

app.get('/users', async (req, res) => {
  const result = await pool.query('SELECT * FROM users');
  res.json(result.rows);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

3. `db/init.sql`

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

INSERT INTO users (name, email) VALUES 
  ('Alice', 'alice@example.com'),
  ('Bob', 'bob@example.com');
```

4. `docker-compose.yml`を作成

```yaml
version: '3.8'

services:
  app:
    build: ./app
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://postgres:password@db:5432/app
    depends_on:
      - db
    # 追加: ヘルスチェック待機

  db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=app
    volumes:
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

5. 起動と確認

```bash
docker compose up -d
docker compose logs -f
```

6. 動作確認

- http://localhost:3000 - 現在時刻
- http://localhost:3000/users - ユーザー一覧

### 追加課題

1. Adminer（DB管理ツール）を追加
2. 環境変数を`.env`ファイルで管理
3. ヘルスチェックを追加

## ✅ 完了条件

- [ ] Docker Composeで環境を起動できた
- [ ] アプリからDBにアクセスできた
- [ ] データが永続化されている（再起動後も残る）
