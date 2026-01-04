# Express/Fastify

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [基礎] |
| 所要時間 | 1-2時間 |
| 前提知識 | Node.js基礎 |

## なぜ学ぶ必要があるのか

### フレームワークが解決する問題

Node.jsだけでは、HTTPサーバーを一から作る必要があります。フレームワークを使うことで、ルーティング、ミドルウェア、エラーハンドリングが簡単になります。

## Express

### 基本的なサーバー

```typescript
import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

### ルーティング

```typescript
app.get('/users', (req, res) => {
  res.json({ users: [] });
});

app.post('/users', (req, res) => {
  // ユーザー作成
  res.status(201).json({ id: 1 });
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id });
});
```

### ミドルウェア

```typescript
// JSONパーサー
app.use(express.json());

// ログミドルウェア
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

## Fastify

### 基本的なサーバー

```typescript
import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

fastify.get('/', async (request, reply) => {
  return { message: 'Hello World' };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

### Fastifyの特徴

- **高速**: Expressより高速
- **型安全性**: TypeScriptとの統合が良い
- **プラグインシステム**: 機能をプラグインで拡張

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] Express/Fastifyでサーバーを作成できる
- [ ] ルーティングを設定できる
- [ ] ミドルウェアを使える

## 次のステップ

- [03. RESTful API開発](03-backend-development-03.md)

## 参考リソース

- [Express公式ドキュメント](https://expressjs.com/ja/)
- [Fastify公式ドキュメント](https://www.fastify.io/)
