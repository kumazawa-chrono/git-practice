# 課題2: 入力検証の実装

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐⭐ |
| 所要時間 | 45分 |

## 🎯 目標

Zodを使った堅牢な入力検証を実装する。

## 📝 課題内容

### 準備

```bash
npm install zod
```

### 課題2-1: ユーザー登録のバリデーション

```typescript
import { z } from 'zod';

// 以下の要件を満たすスキーマを作成
// - name: 1-50文字
// - email: 有効なメールアドレス
// - password: 8文字以上、大文字・小文字・数字を含む
// - age: 任意、0-150の整数
// - role: 'user' または 'admin'

const userSchema = z.object({
  // 実装
});

// テストケース
const validInput = {
  name: 'Alice',
  email: 'alice@example.com',
  password: 'Password123',
  age: 25,
  role: 'user',
};

const invalidInputs = [
  { name: '', email: 'alice@example.com', password: 'Password123', role: 'user' },
  { name: 'Alice', email: 'invalid', password: 'Password123', role: 'user' },
  { name: 'Alice', email: 'alice@example.com', password: 'weak', role: 'user' },
];
```

### 課題2-2: APIリクエストの検証

```typescript
// 以下のAPIリクエストを検証するスキーマを作成

// GET /api/products?category=electronics&minPrice=100&maxPrice=500&sort=price&order=asc

const querySchema = z.object({
  // category: 必須、文字列
  // minPrice: 任意、0以上の数値
  // maxPrice: 任意、0以上の数値
  // sort: 任意、'name' | 'price' | 'createdAt'
  // order: 任意、'asc' | 'desc'
  // 実装
});

// カスタムバリデーション: minPrice <= maxPrice
```

### 課題2-3: ミドルウェアの実装

```typescript
// 汎用的なバリデーションミドルウェアを実装

function validateBody<T>(schema: z.ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    // 実装
    // - スキーマで検証
    // - 成功: req.body を検証済みデータで上書きして next()
    // - 失敗: 400エラーとエラー詳細を返す
  };
}

// 使用例
app.post('/api/users', validateBody(userSchema), createUser);
```

## ✅ 完了条件

- [ ] ユーザースキーマが要件を満たす
- [ ] クエリスキーマが正しく検証できる
- [ ] ミドルウェアが正しく動作する

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../../docs/terms-of-use.md)をご覧ください。
