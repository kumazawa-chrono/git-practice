# データベース連携

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [中級] |
| 所要時間 | 1-2時間 |
| 前提知識 | データベース基礎、バックエンド開発 |

## なぜ学ぶ必要があるのか

### データベース連携が解決する問題

- **データの永続化**: アプリケーションのデータを保存
- **リレーション管理**: データ間の関係を管理
- **型安全性**: TypeScriptと統合されたORM

## Prisma

### セットアップ

```bash
npm install prisma @prisma/client
npx prisma init
```

### スキーマ定義

```prisma
// schema.prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
}
```

### マイグレーション

```bash
npx prisma migrate dev --name init
```

### クライアントの使用

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 作成
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    name: 'John',
  },
});

// 取得
const users = await prisma.user.findMany({
  include: { posts: true },
});

// 更新
const updatedUser = await prisma.user.update({
  where: { id: 1 },
  data: { name: 'Jane' },
});

// 削除
await prisma.user.delete({
  where: { id: 1 },
});
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] Prismaでスキーマを定義できる
- [ ] マイグレーションを実行できる
- [ ] CRUD操作ができる

## 次のステップ

- [03. 認証フロー](04-fullstack-practice-03.md)

## 参考リソース

- [Prisma公式ドキュメント](https://www.prisma.io/docs)
