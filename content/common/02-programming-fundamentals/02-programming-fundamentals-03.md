# オブジェクト指向

## 📋 概要

| 項目 | 内容 |
|------|------|
| 所要時間 | 60分 |
| 難易度 | [中級] |
| 前提知識 | 関数とモジュール |

## 🎯 なぜこれを学ぶのか

オブジェクト指向は、データと処理をまとめて管理する考え方です。大規模なアプリケーションを整理し、再利用性を高めます。

## 📚 学習内容

### 1. クラスの基本

```typescript
class User {
  // プロパティ
  name: string;
  age: number;

  // コンストラクタ
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // メソッド
  greet(): string {
    return `Hello, I'm ${this.name}`;
  }
}

// インスタンス化
const user = new User("Alice", 25);
console.log(user.greet()); // Hello, I'm Alice
```

### 2. アクセス修飾子

```typescript
class BankAccount {
  public owner: string;      // どこからでもアクセス可能
  private balance: number;   // クラス内のみ
  protected id: string;      // クラス内とサブクラス

  constructor(owner: string, initialBalance: number) {
    this.owner = owner;
    this.balance = initialBalance;
    this.id = crypto.randomUUID();
  }

  // publicメソッドでprivateプロパティにアクセス
  getBalance(): number {
    return this.balance;
  }

  deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
    }
  }
}

const account = new BankAccount("Alice", 1000);
console.log(account.owner);      // OK
console.log(account.balance);    // エラー！private
console.log(account.getBalance()); // OK - 1000
```

### 3. 簡略記法

```typescript
// コンストラクタで直接プロパティを定義
class User {
  constructor(
    public name: string,
    private age: number,
    readonly id: string // 読み取り専用
  ) {}

  getAge(): number {
    return this.age;
  }
}
```

### 4. 継承

```typescript
// 基底クラス
class Animal {
  constructor(public name: string) {}

  speak(): string {
    return "...";
  }
}

// 派生クラス
class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name); // 親のコンストラクタを呼ぶ
  }

  // メソッドのオーバーライド
  speak(): string {
    return "Woof!";
  }

  // 新しいメソッド
  fetch(): string {
    return `${this.name} is fetching!`;
  }
}

const dog = new Dog("Max", "Labrador");
console.log(dog.speak());  // Woof!
console.log(dog.fetch());  // Max is fetching!
```

### 5. インターフェース

```typescript
// インターフェースで型を定義
interface User {
  id: number;
  name: string;
  email: string;
  greet(): string;
}

// インターフェースを実装
class Member implements User {
  constructor(
    public id: number,
    public name: string,
    public email: string
  ) {}

  greet(): string {
    return `Hello, I'm ${this.name}`;
  }
}

// 関数の引数にも使える
function sendEmail(user: User): void {
  console.log(`Sending email to ${user.email}`);
}
```

### 6. 抽象クラス

```typescript
// 抽象クラス（直接インスタンス化できない）
abstract class Shape {
  abstract getArea(): number;  // 抽象メソッド（実装必須）

  describe(): string {
    return `This shape has an area of ${this.getArea()}`;
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }

  getArea(): number {
    return this.width * this.height;
  }
}

const circle = new Circle(5);
console.log(circle.getArea());    // 78.54...
console.log(circle.describe());   // This shape has an area of 78.54...
```

### 7. ゲッターとセッター

```typescript
class Temperature {
  private _celsius: number = 0;

  // ゲッター
  get celsius(): number {
    return this._celsius;
  }

  // セッター（バリデーション付き）
  set celsius(value: number) {
    if (value < -273.15) {
      throw new Error("Temperature below absolute zero!");
    }
    this._celsius = value;
  }

  // 計算プロパティ
  get fahrenheit(): number {
    return this._celsius * 9/5 + 32;
  }
}

const temp = new Temperature();
temp.celsius = 25;
console.log(temp.fahrenheit); // 77
```

### 8. 静的メンバー

```typescript
class MathUtils {
  static PI = 3.14159;

  static add(a: number, b: number): number {
    return a + b;
  }

  static isEven(n: number): boolean {
    return n % 2 === 0;
  }
}

// インスタンス化せずに使用
console.log(MathUtils.PI);        // 3.14159
console.log(MathUtils.add(1, 2)); // 3
console.log(MathUtils.isEven(4)); // true
```

### 9. クラス vs 関数

```typescript
// クラスを使う場合
class UserService {
  constructor(private apiUrl: string) {}

  async getUser(id: number): Promise<User> {
    // ...
  }
}

// 関数を使う場合（シンプルな処理）
function formatUserName(user: User): string {
  return `${user.name} (${user.email})`;
}
```

**使い分けの目安**:
- **クラス**: 状態を持つ、複数のメソッドがある
- **関数**: 状態を持たない、単純な変換

## ✅ まとめ

| 概念 | 説明 |
|------|------|
| クラス | データとメソッドをまとめる |
| 継承 | 既存クラスを拡張 |
| インターフェース | 型の契約を定義 |
| アクセス修飾子 | public, private, protected |

## 💬 考えてみよう

```
Q: クラスとインターフェースの違いは何ですか？
Q: private を使う理由は何ですか？
Q: クラスと関数はどう使い分けますか？
```

## 🔗 次のコンテンツ

[型システム](02-programming-fundamentals-04.md)に進んでください。

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../docs/terms-of-use.md)をご覧ください。
