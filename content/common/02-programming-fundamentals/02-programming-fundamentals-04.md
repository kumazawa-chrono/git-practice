# 型システム

## 📋 概要

| 項目 | 内容 |
|------|------|
| 所要時間 | 60分 |
| 難易度 | [中級] |
| 前提知識 | オブジェクト指向 |

## 🎯 なぜこれを学ぶのか

TypeScriptの型システムを使いこなすと、バグを未然に防ぎ、コードの品質と開発効率が大幅に向上します。

## 📚 学習内容

### 1. 型推論

```typescript
// TypeScriptが型を推論
let message = "Hello";  // string と推論
let count = 42;         // number と推論
let items = [1, 2, 3];  // number[] と推論

// 推論できない場合は明示
let data: unknown;
```

### 2. ユニオン型

```typescript
// 複数の型を許容
let id: string | number;
id = "abc";  // OK
id = 123;    // OK
id = true;   // エラー！

// 関数の引数にも
function printId(id: string | number): void {
  // 型を絞り込む（Type Narrowing）
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(2));
  }
}
```

### 3. リテラル型

```typescript
// 特定の値のみ許容
type Direction = "north" | "south" | "east" | "west";

function move(direction: Direction): void {
  console.log(`Moving ${direction}`);
}

move("north");  // OK
move("up");     // エラー！
```

### 4. 型エイリアス

```typescript
// 型に名前をつける
type UserId = string | number;
type Point = { x: number; y: number };

// 複雑な型も定義可能
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

const response: ApiResponse<User> = {
  data: { id: 1, name: "Alice", email: "alice@example.com" },
  status: 200,
  message: "Success"
};
```

### 5. ジェネリクス

```typescript
// 型をパラメータ化
function identity<T>(value: T): T {
  return value;
}

identity<string>("hello");  // string
identity<number>(42);       // number
identity(true);             // boolean（推論）

// 配列に使う
function first<T>(items: T[]): T | undefined {
  return items[0];
}

first([1, 2, 3]);        // number | undefined
first(["a", "b", "c"]);  // string | undefined
```

#### ジェネリクスの制約

```typescript
// 特定のプロパティを持つ型に制約
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

logLength("hello");     // OK - stringはlengthを持つ
logLength([1, 2, 3]);   // OK - 配列もlengthを持つ
logLength(123);         // エラー！numberはlengthを持たない
```

### 6. 型ガード

```typescript
// typeof
function process(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  return value.toString();
}

// instanceof
class Dog { bark() { return "Woof!"; } }
class Cat { meow() { return "Meow!"; } }

function speak(animal: Dog | Cat): string {
  if (animal instanceof Dog) {
    return animal.bark();
  }
  return animal.meow();
}

// in
interface Bird { fly(): void; }
interface Fish { swim(): void; }

function move(animal: Bird | Fish): void {
  if ("fly" in animal) {
    animal.fly();
  } else {
    animal.swim();
  }
}
```

### 7. ユーティリティ型

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial: すべてオプショナル
type PartialUser = Partial<User>;
// { id?: number; name?: string; ... }

// Required: すべて必須
type RequiredUser = Required<PartialUser>;

// Pick: 一部を取り出す
type UserName = Pick<User, "name" | "email">;
// { name: string; email: string; }

// Omit: 一部を除外
type UserWithoutId = Omit<User, "id">;
// { name: string; email: string; age: number; }

// Readonly: 読み取り専用
type ReadonlyUser = Readonly<User>;

// Record: キーと値の型を指定
type UserRoles = Record<string, "admin" | "user">;
// { [key: string]: "admin" | "user" }
```

### 8. nullとundefinedの扱い

```typescript
// strictNullChecks が有効な場合（推奨）
function getLength(str: string | null): number {
  // if でnullチェック
  if (str === null) {
    return 0;
  }
  return str.length;

  // または オプショナルチェイニング
  // return str?.length ?? 0;
}

// 非nullアサーション（確実にnullでないとき）
function getValue(element: HTMLElement | null): string {
  return element!.textContent ?? "";  // ! で非null宣言
}
```

### 9. オプショナルチェイニングとNullish Coalescing

```typescript
interface Company {
  name: string;
  address?: {
    city?: string;
  };
}

const company: Company = { name: "Acme" };

// オプショナルチェイニング (?.)
const city = company.address?.city;  // undefined（エラーにならない）

// Nullish Coalescing (??)
const displayCity = company.address?.city ?? "Unknown";  // "Unknown"

// ||との違い
const value1 = 0 || "default";   // "default"（0はfalsyなので）
const value2 = 0 ?? "default";   // 0（nullとundefinedのみ）
```

### 10. 型のベストプラクティス

```typescript
// ✅ 良い例
type Status = "pending" | "approved" | "rejected";

interface Order {
  id: string;
  status: Status;
  items: OrderItem[];
}

// ❌ 避ける例
interface Order {
  id: any;              // any は避ける
  status: string;       // リテラル型を使う
  items: object[];      // 具体的な型を使う
}
```

## ✅ まとめ

| 概念 | 用途 |
|------|------|
| ユニオン型 | 複数の型を許容 |
| リテラル型 | 特定の値のみ許容 |
| ジェネリクス | 型をパラメータ化 |
| 型ガード | 型を絞り込む |
| ユーティリティ型 | 型を変換 |

## 💬 考えてみよう

```
Q: any と unknown の違いは何ですか？
Q: ジェネリクスを使うメリットは何ですか？
Q: ?? と || の違いは何ですか？
```

## 🔗 次のコンテンツ

[エラーハンドリング](02-programming-fundamentals-05.md)に進んでください。
