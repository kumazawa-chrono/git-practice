# 課題3: 認証システムの実装

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐⭐⭐ |
| 所要時間 | 60分 |

## 🎯 目標

安全な認証システムを実装する。

## 📝 課題内容

### 準備

```bash
npm install bcrypt jsonwebtoken
npm install @types/bcrypt @types/jsonwebtoken -D
```

### 課題3-1: パスワードのハッシュ化

```typescript
import bcrypt from 'bcrypt';

export class PasswordService {
  private readonly saltRounds = 10;

  // パスワードをハッシュ化
  async hash(password: string): Promise<string> {
    // 実装
  }

  // パスワードを検証
  async verify(password: string, hash: string): Promise<boolean> {
    // 実装
  }

  // パスワード強度チェック
  validateStrength(password: string): { valid: boolean; errors: string[] } {
    // 8文字以上、大文字、小文字、数字を含む
    // 実装
  }
}

// テスト
const service = new PasswordService();
const hash = await service.hash('Password123');
console.log(await service.verify('Password123', hash)); // true
console.log(await service.verify('wrong', hash)); // false
```

### 課題3-2: JWT認証

```typescript
import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
  role: string;
}

export class JwtService {
  constructor(private secret: string) {}

  // トークン生成
  generate(payload: TokenPayload, expiresIn: string = '1h'): string {
    // 実装
  }

  // トークン検証
  verify(token: string): TokenPayload | null {
    // 実装
    // 無効なトークンの場合は null を返す
  }
}

// テスト
const jwtService = new JwtService(process.env.JWT_SECRET!);
const token = jwtService.generate({ userId: '1', role: 'user' });
const payload = jwtService.verify(token);
console.log(payload); // { userId: '1', role: 'user' }
```

### 課題3-3: 認証ミドルウェア

```typescript
export function authMiddleware(jwtService: JwtService) {
  return (req: Request, res: Response, next: NextFunction) => {
    // 1. Authorization ヘッダーからトークンを取得
    // 2. Bearer トークンの形式を確認
    // 3. トークンを検証
    // 4. 成功: req.user にペイロードを設定して next()
    // 5. 失敗: 401エラー
    // 実装
  };
}

// 使用例
app.get('/api/profile', authMiddleware(jwtService), (req, res) => {
  res.json({ user: req.user });
});
```

### 課題3-4: 認可ミドルウェア

```typescript
export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    // 1. req.user が存在するか確認
    // 2. ユーザーの role が許可されたロールに含まれるか確認
    // 3. 成功: next()
    // 4. 失敗: 403エラー
    // 実装
  };
}

// 使用例
app.delete('/api/users/:id', 
  authMiddleware(jwtService),
  requireRole('admin'),
  deleteUser
);
```

## ✅ 完了条件

- [ ] パスワードが正しくハッシュ化・検証される
- [ ] JWTの生成・検証が正しく動作する
- [ ] 認証ミドルウェアが正しく動作する
- [ ] 認可ミドルウェアが正しく動作する
