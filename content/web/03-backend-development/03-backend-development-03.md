# RESTful API開発

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [中級] |
| 所要時間 | 1-2時間 |
| 前提知識 | Express/Fastify |

## なぜ学ぶ必要があるのか

### RESTful APIが解決する問題

標準化されたAPI設計により、フロントエンドとバックエンドの連携が容易になります。

## CRUD操作の実装

### GET - 一覧取得

```typescript
app.get('/api/users', async (req, res) => {
  const users = await db.user.findMany();
  res.json({ users });
});
```

### GET - 詳細取得

```typescript
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await db.user.findUnique({ where: { id: parseInt(id) } });
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json({ user });
});
```

### POST - 作成

```typescript
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  
  // バリデーション
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  const user = await db.user.create({
    data: { name, email },
  });
  
  res.status(201).json({ user });
});
```

### PUT - 更新

```typescript
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  
  const user = await db.user.update({
    where: { id: parseInt(id) },
    data: { name, email },
  });
  
  res.json({ user });
});
```

### DELETE - 削除

```typescript
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  
  await db.user.delete({
    where: { id: parseInt(id) },
  });
  
  res.status(204).send();
});
```

## バリデーション

```typescript
import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

app.post('/api/users', async (req, res) => {
  try {
    const data = createUserSchema.parse(req.body);
    const user = await db.user.create({ data });
    res.status(201).json({ user });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    throw error;
  }
});
```

## エラーハンドリング

```typescript
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] CRUD操作を実装できる
- [ ] バリデーションを実装できる
- [ ] エラーハンドリングができる

## 次のステップ

- [04. 認証・認可](03-backend-development-04.md)

## 参考リソース

- [Zod公式ドキュメント](https://zod.dev/)

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../docs/terms-of-use.md)をご覧ください。
