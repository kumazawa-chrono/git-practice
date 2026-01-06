# エラーハンドリング

## 📋 概要

| 項目 | 内容 |
|------|------|
| 所要時間 | 45分 |
| 難易度 | [基礎] |
| 前提知識 | 型システム |

## 🎯 なぜこれを学ぶのか

プログラムは必ずエラーが発生します。適切なエラーハンドリングは、アプリケーションの信頼性を高め、問題の特定を容易にします。

## 📚 学習内容

### 1. try-catch-finally

```typescript
try {
  // エラーが発生する可能性のあるコード
  const data = JSON.parse('invalid json');
} catch (error) {
  // エラー発生時の処理
  console.error("JSONパースエラー:", error);
} finally {
  // 必ず実行される（省略可）
  console.log("処理完了");
}
```

### 2. Errorオブジェクト

```typescript
try {
  throw new Error("Something went wrong");
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);  // "Something went wrong"
    console.log(error.name);     // "Error"
    console.log(error.stack);    // スタックトレース
  }
}
```

### 3. カスタムエラー

```typescript
// カスタムエラークラス
class ValidationError extends Error {
  constructor(
    message: string,
    public field: string
  ) {
    super(message);
    this.name = "ValidationError";
  }
}

class NotFoundError extends Error {
  constructor(resource: string) {
    super(`${resource} not found`);
    this.name = "NotFoundError";
  }
}

// 使用例
function validateEmail(email: string): void {
  if (!email.includes("@")) {
    throw new ValidationError("Invalid email format", "email");
  }
}

function getUser(id: number): User {
  const user = database.find(u => u.id === id);
  if (!user) {
    throw new NotFoundError("User");
  }
  return user;
}
```

### 4. エラーの型判定

```typescript
try {
  await fetchData();
} catch (error) {
  // TypeScriptではerrorはunknown型
  if (error instanceof ValidationError) {
    console.log(`Validation failed: ${error.field}`);
  } else if (error instanceof NotFoundError) {
    console.log("Resource not found");
  } else if (error instanceof Error) {
    console.log(`Error: ${error.message}`);
  } else {
    console.log("Unknown error occurred");
  }
}
```

### 5. 非同期のエラーハンドリング

```typescript
// async/await
async function fetchUser(id: number): Promise<User> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error; // 再スロー
  }
}

// Promise チェーン
fetchUser(1)
  .then(user => console.log(user))
  .catch(error => console.error(error));
```

### 6. エラーハンドリングのパターン

#### パターン1: Result型（関数型スタイル）

```typescript
type Result<T, E> = 
  | { success: true; data: T }
  | { success: false; error: E };

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return { success: false, error: "Division by zero" };
  }
  return { success: true, data: a / b };
}

// 使用
const result = divide(10, 2);
if (result.success) {
  console.log(result.data);  // 5
} else {
  console.log(result.error);
}
```

#### パターン2: null/undefinedを返す

```typescript
function findUser(id: number): User | undefined {
  return users.find(u => u.id === id);
}

// 使用
const user = findUser(1);
if (user) {
  console.log(user.name);
} else {
  console.log("User not found");
}
```

### 7. エラーのロギング

```typescript
// 本番環境向けのエラーロギング
function logError(error: Error, context?: Record<string, unknown>): void {
  console.error({
    name: error.name,
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    ...context
  });

  // 本番では外部サービスに送信
  // Sentry.captureException(error);
}

// 使用
try {
  await riskyOperation();
} catch (error) {
  if (error instanceof Error) {
    logError(error, { userId: currentUser.id });
  }
  throw error;
}
```

### 8. ベストプラクティス

```typescript
// ✅ 良い例

// 1. 具体的なエラーをキャッチ
try {
  await saveUser(user);
} catch (error) {
  if (error instanceof ValidationError) {
    // バリデーションエラーはユーザーに表示
    showError(error.message);
  } else {
    // その他のエラーはログに記録
    logError(error);
    showError("An unexpected error occurred");
  }
}

// 2. エラーを握りつぶさない
try {
  await operation();
} catch (error) {
  console.error(error);  // 最低限ログを出す
  throw error;           // または再スロー
}

// ❌ 悪い例

// 1. 空のcatchブロック
try {
  await operation();
} catch (error) {
  // 何もしない - バグの原因になる
}

// 2. 非具体的なエラーメッセージ
throw new Error("Error"); // 何のエラーかわからない
```

## ✅ まとめ

| 概念 | ポイント |
|------|---------|
| try-catch | エラーをキャッチして処理 |
| カスタムエラー | 具体的なエラー型を定義 |
| 型判定 | instanceofで型を判定 |
| ロギング | エラー情報を記録 |

## 💬 考えてみよう

```
Q: いつカスタムエラーを作成すべきですか？
Q: catchブロックで何をすべきですか？
Q: エラーを再スローする理由は何ですか？
```

## 🔗 次のコンテンツ

[デバッグ](02-programming-fundamentals-06.md)に進んでください。

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../docs/terms-of-use.md)をご覧ください。
