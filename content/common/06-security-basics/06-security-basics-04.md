# セキュアコーディング

## 📋 概要

| 項目 | 内容 |
|------|------|
| 所要時間 | 45分 |
| 難易度 | [中級] |
| 前提知識 | 認証・認可 |

## 🎯 なぜこれを学ぶのか

コードレベルでセキュリティを意識することで、脆弱性の混入を防ぎます。AI生成コードをレビューする際にも重要なスキルです。

## 📚 学習内容

### 1. 入力検証

**すべての入力は信頼しない**

```typescript
// ❌ 危険なコード
function createUser(data: any) {
  return db.insert('users', data);
}

// ✅ 安全なコード
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().min(0).max(150).optional(),
});

function createUser(data: unknown) {
  const validated = userSchema.parse(data);
  return db.insert('users', validated);
}
```

### 2. 出力エスケープ

```typescript
// HTML出力
import { escape } from 'lodash';
const html = `<p>${escape(userInput)}</p>`;

// SQL（パラメータ化）
await db.query('SELECT * FROM users WHERE id = $1', [userId]);

// URLパラメータ
const url = `https://example.com?q=${encodeURIComponent(query)}`;

// JSON出力
res.json({ message: sanitize(userInput) });
```

### 3. 機密情報の扱い

```typescript
// ❌ 危険なコード
const config = {
  apiKey: 'sk-1234567890',  // ハードコード
};
console.log('User:', user);  // 機密情報をログ出力

// ✅ 安全なコード
const config = {
  apiKey: process.env.API_KEY,
};
console.log('User ID:', user.id);  // 必要な情報のみ

// パスワードはレスポンスに含めない
const safeUser = {
  id: user.id,
  name: user.name,
  email: user.email,
  // password: user.password は含めない
};
```

### 4. エラーハンドリング

```typescript
// ❌ 危険なコード
try {
  await db.query(sql);
} catch (error) {
  res.status(500).json({ error: error.message });
  // スタックトレースや内部情報が漏れる
}

// ✅ 安全なコード
try {
  await db.query(sql);
} catch (error) {
  console.error('DB Error:', error);  // 内部ログ
  res.status(500).json({ error: 'Internal server error' });
  // ユーザーには汎用メッセージ
}
```

### 5. 依存ライブラリの管理

```bash
# 脆弱性チェック
npm audit

# 自動修正
npm audit fix

# package-lock.jsonをコミット
git add package-lock.json
```

```json
// package.json
{
  "scripts": {
    "security-check": "npm audit --audit-level=moderate"
  }
}
```

### 6. セキュリティヘッダー

```typescript
import helmet from 'helmet';

app.use(helmet());

// 個別設定
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
  },
}));
```

### 7. AI生成コードのセキュリティレビュー

```typescript
// AIが生成したコード（要チェック）
async function getUser(id: string) {
  const user = await db.query(`SELECT * FROM users WHERE id = '${id}'`);
  // ⚠️ SQLインジェクションの可能性！
  return user;
}

// レビュー後の修正
async function getUser(id: string) {
  const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  return user;
}
```

**AIコードのチェックポイント**:
- [ ] SQLはパラメータ化されているか
- [ ] ユーザー入力は検証されているか
- [ ] 出力はエスケープされているか
- [ ] 機密情報はハードコードされていないか

### 8. セキュリティチェックリスト

```
□ 入力検証
  □ 型チェック
  □ 長さ制限
  □ フォーマット検証
  □ ホワイトリスト

□ 出力エスケープ
  □ HTML
  □ SQL
  □ URL

□ 認証・認可
  □ パスワードハッシュ化
  □ セッション管理
  □ 権限チェック

□ 機密情報
  □ 環境変数で管理
  □ ログに出力しない
  □ レスポンスに含めない

□ 依存関係
  □ npm audit
  □ 定期更新
```

## ✅ まとめ

| 観点 | 対策 |
|------|------|
| 入力 | 検証（バリデーション） |
| 出力 | エスケープ |
| 機密情報 | 環境変数、暗号化 |
| エラー | 詳細を隠す |

## 🔗 次のステップ

セキュリティ基礎カテゴリを修了しました！
[実践課題](./exercises/)に取り組んでから、[インフラ基礎](../07-infrastructure-basics/)に進んでください。

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../docs/terms-of-use.md)をご覧ください。
