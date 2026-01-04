# OWASP Top 10

## 📋 概要

| 項目 | 内容 |
|------|------|
| 所要時間 | 45分 |
| 難易度 | [中級] |
| 前提知識 | セキュリティ基本概念 |

## 🎯 なぜこれを学ぶのか

OWASP Top 10は、Webアプリケーションで最も危険な脆弱性のリストです。これらを理解することで、よくある攻撃を防げます。

## 📚 学習内容

### OWASP Top 10 (2021)

| 順位 | 脆弱性 |
|:----:|--------|
| 1 | アクセス制御の不備 |
| 2 | 暗号化の失敗 |
| 3 | インジェクション |
| 4 | 安全でない設計 |
| 5 | セキュリティの設定ミス |
| 6 | 脆弱で古いコンポーネント |
| 7 | 識別と認証の失敗 |
| 8 | ソフトウェアとデータの整合性の不具合 |
| 9 | セキュリティログと監視の失敗 |
| 10 | サーバーサイドリクエストフォージェリ |

### 1. SQLインジェクション

**攻撃**: SQL文に不正な入力を注入

```typescript
// ❌ 脆弱なコード
const query = `SELECT * FROM users WHERE id = '${userId}'`;
// userId = "1' OR '1'='1" → すべてのユーザーが取得される

// ✅ 安全なコード（パラメータ化クエリ）
const query = 'SELECT * FROM users WHERE id = $1';
await db.query(query, [userId]);
```

### 2. クロスサイトスクリプティング（XSS）

**攻撃**: 悪意のあるスクリプトを注入

```typescript
// ❌ 脆弱なコード
const html = `<div>${userInput}</div>`;
// userInput = "<script>document.cookie</script>"

// ✅ 安全なコード（エスケープ）
import { escape } from 'lodash';
const html = `<div>${escape(userInput)}</div>`;

// Reactの場合は自動エスケープ
return <div>{userInput}</div>;
```

### 3. クロスサイトリクエストフォージェリ（CSRF）

**攻撃**: 認証済みユーザーに意図しないリクエストを送らせる

```html
<!-- 攻撃者のサイト -->
<img src="https://bank.com/transfer?to=attacker&amount=10000">
```

**対策**: CSRFトークンの使用

```typescript
// トークンを生成してセッションに保存
const csrfToken = crypto.randomUUID();
session.csrfToken = csrfToken;

// フォームにトークンを含める
<input type="hidden" name="_csrf" value={csrfToken}>

// サーバーで検証
if (req.body._csrf !== session.csrfToken) {
  throw new Error('CSRF token mismatch');
}
```

### 4. 安全でない直接オブジェクト参照

**攻撃**: IDを変えて他人のデータにアクセス

```typescript
// ❌ 脆弱なコード
app.get('/api/orders/:id', async (req, res) => {
  const order = await db.findOrder(req.params.id);
  res.json(order);
});

// ✅ 安全なコード（所有者チェック）
app.get('/api/orders/:id', async (req, res) => {
  const order = await db.findOrder(req.params.id);
  if (order.userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  res.json(order);
});
```

### 5. セキュリティの設定ミス

```
✅ 確認すべき設定
- デバッグモードは無効に
- デフォルトパスワードを変更
- 不要なサービスを停止
- エラーメッセージを最小限に
- HTTPSを強制
```

### 6. 脆弱なコンポーネント

```bash
# 脆弱性のチェック
npm audit

# 修正
npm audit fix

# 定期的な更新
npm update
```

## ✅ まとめ

| 脆弱性 | 対策 |
|--------|------|
| SQLi | パラメータ化クエリ |
| XSS | 出力エスケープ |
| CSRF | CSRFトークン |
| 不正アクセス | 認可チェック |

## 🔗 次のコンテンツ

[認証・認可](06-security-basics-03.md)に進んでください。
