# 関数とモジュール

## 📋 概要

| 項目 | 内容 |
|------|------|
| 所要時間 | 60分 |
| 難易度 | [基礎] |
| 前提知識 | 基本構文 |

## 🎯 なぜこれを学ぶのか

関数は処理を再利用可能な単位にまとめる基本です。モジュールはコードを整理し、大規模なアプリケーションを管理しやすくします。

## 📚 学習内容

### 1. 関数の基本

#### 1.1 関数宣言

```typescript
// 関数宣言
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("Alice")); // Hello, Alice!
```

#### 1.2 アロー関数（推奨）

```typescript
// アロー関数
const greet = (name: string): string => {
  return `Hello, ${name}!`;
};

// 1行なら省略可能
const greet2 = (name: string): string => `Hello, ${name}!`;
```

#### 1.3 引数と戻り値の型

```typescript
// 引数の型、戻り値の型を明示
function add(a: number, b: number): number {
  return a + b;
}

// 戻り値がない場合は void
function log(message: string): void {
  console.log(message);
}
```

### 2. 引数のパターン

#### 2.1 オプション引数

```typescript
// ? でオプショナルに
function greet(name: string, greeting?: string): string {
  return `${greeting ?? "Hello"}, ${name}!`;
}

greet("Alice");           // Hello, Alice!
greet("Alice", "Hi");     // Hi, Alice!
```

#### 2.2 デフォルト引数

```typescript
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

greet("Alice");           // Hello, Alice!
greet("Alice", "Hi");     // Hi, Alice!
```

#### 2.3 残余引数（Rest Parameters）

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

sum(1, 2, 3);     // 6
sum(1, 2, 3, 4, 5); // 15
```

### 3. 関数の型

#### 3.1 型エイリアス

```typescript
// 関数の型を定義
type GreetFunction = (name: string) => string;

const greet: GreetFunction = (name) => `Hello, ${name}!`;
```

#### 3.2 コールバック関数

```typescript
// コールバックを受け取る関数
function processArray(
  numbers: number[],
  callback: (n: number) => number
): number[] {
  return numbers.map(callback);
}

const doubled = processArray([1, 2, 3], (n) => n * 2);
// [2, 4, 6]
```

### 4. 非同期関数

#### 4.1 Promise

```typescript
// Promiseを返す関数
function fetchData(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data loaded");
    }, 1000);
  });
}

fetchData().then(data => console.log(data));
```

#### 4.2 async/await

```typescript
// async/await で読みやすく
async function fetchData(): Promise<string> {
  // 実際のAPI呼び出しを想定
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();
  return data;
}

// 使用
async function main() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
```

### 5. モジュール

#### 5.1 export / import

**math.ts**:
```typescript
// 名前付きエクスポート
export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

// デフォルトエクスポート
export default function multiply(a: number, b: number): number {
  return a * b;
}
```

**main.ts**:
```typescript
// 名前付きインポート
import { add, subtract } from "./math";

// デフォルトインポート
import multiply from "./math";

// 全部インポート
import * as math from "./math";

console.log(add(1, 2));      // 3
console.log(multiply(3, 4)); // 12
console.log(math.add(5, 6)); // 11
```

#### 5.2 ファイル構成の例

```
src/
├── index.ts        # エントリーポイント
├── utils/
│   ├── index.ts    # 再エクスポート
│   ├── string.ts
│   └── number.ts
└── types/
    └── index.ts    # 型定義
```

**utils/string.ts**:
```typescript
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
```

**utils/index.ts**:
```typescript
// 再エクスポート（バレルファイル）
export * from "./string";
export * from "./number";
```

**index.ts**:
```typescript
import { capitalize } from "./utils";

console.log(capitalize("hello")); // Hello
```

### 6. 型のエクスポート

```typescript
// types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export type UserRole = "admin" | "user" | "guest";

// 使用側
import type { User, UserRole } from "./types/user";

function createUser(name: string, role: UserRole): User {
  return { id: 1, name, email: `${name}@example.com` };
}
```

## ✅ まとめ

| 概念 | ポイント |
|------|---------|
| 関数 | アロー関数を推奨、型を明示 |
| 引数 | オプション(?), デフォルト(=), 残余(...) |
| 非同期 | async/await を使用 |
| モジュール | export/import で分割 |

## 💬 考えてみよう

```
Q: 関数宣言とアロー関数の違いは何ですか？
Q: なぜモジュールに分割するのですか？
Q: async/await を使うメリットは何ですか？
```

## 🔗 次のコンテンツ

[オブジェクト指向](02-programming-fundamentals-03.md)に進んでください。
