# 認証フロー

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [中級] |
| 所要時間 | 1-2時間 |
| 前提知識 | 認証・認可、フロントエンドとバックエンドの連携 |

## なぜ学ぶ必要があるのか

### 認証フローが解決する問題

フロントエンドとバックエンドを連携した認証システムを実装することで、安全なアプリケーションを構築できます。

## フルスタック認証の実装

### バックエンド: ログインAPI

```typescript
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !await bcrypt.compare(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: '24h' }
  );
  
  res.json({ token, user: { id: user.id, email: user.email } });
});
```

### フロントエンド: ログイン処理

```typescript
async function login(email: string, password: string) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  const { token, user } = await response.json();
  localStorage.setItem('token', token);
  return user;
}
```

### 認証状態の管理

```typescript
// hooks/useAuth.ts
import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser(token).then(setUser).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);
  
  return { user, loading };
}
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] フルスタック認証フローを実装できる
- [ ] 認証状態を管理できる
- [ ] 保護されたルートを実装できる

## 次のステップ

- [04. パフォーマンス最適化](04-fullstack-practice-04.md)

## 参考リソース

- [Next.js認証ガイド](https://nextjs.org/docs/authentication)

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../docs/terms-of-use.md)をご覧ください。
