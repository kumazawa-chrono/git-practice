# 課題2: モックを使ったテスト

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐⭐ |
| 所要時間 | 60分 |

## 🎯 目標

外部依存をモックしてテストを書けるようになる。

## 📝 課題内容

### 課題2-1: APIクライアントのテスト

```typescript
// userApi.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`https://api.example.com/users/${id}`);
  if (!response.ok) {
    throw new Error('User not found');
  }
  return response.json();
}

export async function createUser(name: string, email: string): Promise<User> {
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    body: JSON.stringify({ name, email }),
  });
  return response.json();
}
```

`fetch`をモックしてテストを書いてください。

テストケース:
- 正常にユーザーを取得できる
- ユーザーが見つからない場合エラー
- ユーザーを作成できる

### 課題2-2: 依存注入を使ったテスト

```typescript
// notificationService.ts
export interface EmailClient {
  send(to: string, subject: string, body: string): Promise<void>;
}

export class NotificationService {
  constructor(private emailClient: EmailClient) {}

  async notifyUser(email: string, message: string): Promise<void> {
    await this.emailClient.send(
      email,
      'お知らせ',
      message
    );
  }

  async notifyAllUsers(emails: string[], message: string): Promise<void> {
    await Promise.all(
      emails.map(email => this.notifyUser(email, message))
    );
  }
}
```

モックの`EmailClient`を作成してテストを書いてください。

### 課題2-3: 日付のモック

```typescript
// dateUtils.ts
export function isExpired(expirationDate: Date): boolean {
  return expirationDate < new Date();
}

export function daysUntilExpiration(expirationDate: Date): number {
  const now = new Date();
  const diff = expirationDate.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
```

日付をモックしてテストを書いてください。

ヒント: `vi.useFakeTimers()`を使用

## ✅ 完了条件

- [ ] fetchをモックしてAPIテストが書けた
- [ ] 依存注入でモックを使えた
- [ ] 日付をモックしてテストできた

## 📤 提出物

- テストファイル（`*.test.ts`）

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../../docs/terms-of-use.md)をご覧ください。
