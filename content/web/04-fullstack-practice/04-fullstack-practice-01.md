# フロントエンドとバックエンドの連携

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [中級] |
| 所要時間 | 1-2時間 |
| 前提知識 | React基礎、Express/Fastify |

## なぜ学ぶ必要があるのか

### 連携が解決する問題

フロントエンドとバックエンドを別々に学ぶだけでは、実際のアプリケーションは作れません。両者を連携させることで、完全なアプリケーションが完成します。

## API呼び出し

### fetch API

```typescript
// GETリクエスト
async function fetchUsers() {
  const response = await fetch('http://localhost:3000/api/users');
  const users = await response.json();
  return users;
}

// POSTリクエスト
async function createUser(user: User) {
  const response = await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
}
```

### axios

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// GET
const users = await api.get('/users');

// POST
const newUser = await api.post('/users', user);
```

## CORS

### バックエンドでの設定

```typescript
// Express
import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// Fastify
import fastifyCors from '@fastify/cors';

fastify.register(fastifyCors, {
  origin: 'http://localhost:3000',
  credentials: true,
});
```

## エラーハンドリング

```typescript
async function fetchUser(id: number) {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] フロントエンドからAPIを呼び出せる
- [ ] CORSを設定できる
- [ ] エラーハンドリングができる

## 次のステップ

- [02. データベース連携](04-fullstack-practice-02.md)

## 参考リソース

- [MDN: fetch API](https://developer.mozilla.org/ja/docs/Web/API/Fetch_API)
- [axios公式ドキュメント](https://axios-http.com/)

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../docs/terms-of-use.md)をご覧ください。
