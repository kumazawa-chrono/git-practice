# 課題1: 脆弱性の特定

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐ |
| 所要時間 | 30分 |

## 🎯 目標

脆弱なコードを発見し、修正案を提示できる。

## 📝 課題内容

以下のコードの脆弱性を特定し、修正してください。

### 課題1-1: SQLインジェクション

```typescript
app.get('/api/users', async (req, res) => {
  const name = req.query.name;
  const query = `SELECT * FROM users WHERE name = '${name}'`;
  const users = await db.query(query);
  res.json(users);
});
```

1. 脆弱性を説明してください
2. 攻撃例を示してください
3. 修正したコードを書いてください

### 課題1-2: XSS

```typescript
app.get('/profile', (req, res) => {
  const username = req.query.username;
  res.send(`<h1>Welcome, ${username}!</h1>`);
});
```

### 課題1-3: 機密情報の漏洩

```typescript
const config = {
  database: {
    host: 'localhost',
    password: 'super_secret_password123',
  },
  apiKey: 'sk-1234567890abcdef',
};

app.get('/api/debug', (req, res) => {
  res.json(config);
});
```

### 課題1-4: 不適切なエラーハンドリング

```typescript
app.post('/api/login', async (req, res) => {
  try {
    const user = await authenticateUser(req.body);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      stack: error.stack 
    });
  }
});
```

## ✅ 完了条件

- [ ] 各脆弱性を説明できた
- [ ] 攻撃例を示せた
- [ ] 安全なコードに修正できた

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../../docs/terms-of-use.md)をご覧ください。
