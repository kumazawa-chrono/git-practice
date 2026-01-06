# 課題2: クラスとインターフェース

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐⭐ |
| 所要時間 | 60分 |

## 🎯 目標

クラスとインターフェースを使ったオブジェクト指向プログラミングを練習する。

## 📝 課題内容

### 課題2-1: 銀行口座クラス

以下の仕様に基づいて`BankAccount`クラスを実装してください。

**仕様**:
- プロパティ: `owner`（名義人）, `balance`（残高、privateで初期値0）
- メソッド:
  - `deposit(amount)`: 入金（負の値は拒否）
  - `withdraw(amount)`: 出金（残高不足の場合はエラー）
  - `getBalance()`: 残高を取得
  - `transfer(to, amount)`: 他の口座に送金

```typescript
class BankAccount {
  // 実装
}

// テストコード
const alice = new BankAccount("Alice");
const bob = new BankAccount("Bob");

alice.deposit(1000);
console.log(alice.getBalance()); // 1000

alice.withdraw(300);
console.log(alice.getBalance()); // 700

alice.transfer(bob, 200);
console.log(alice.getBalance()); // 500
console.log(bob.getBalance());   // 200
```

### 課題2-2: 図形クラス

抽象クラス`Shape`と、それを継承する`Circle`, `Rectangle`, `Triangle`を実装してください。

```typescript
abstract class Shape {
  abstract getArea(): number;
  abstract getPerimeter(): number;
  
  describe(): string {
    return `面積: ${this.getArea().toFixed(2)}, 周囲: ${this.getPerimeter().toFixed(2)}`;
  }
}

class Circle extends Shape {
  // 実装（コンストラクタでradiusを受け取る）
}

class Rectangle extends Shape {
  // 実装（コンストラクタでwidth, heightを受け取る）
}

class Triangle extends Shape {
  // 実装（コンストラクタでa, b, cの3辺を受け取る）
  // 面積はヘロンの公式を使用
}

// テストコード
const circle = new Circle(5);
console.log(circle.describe()); // 面積: 78.54, 周囲: 31.42

const rect = new Rectangle(4, 5);
console.log(rect.describe()); // 面積: 20.00, 周囲: 18.00

const triangle = new Triangle(3, 4, 5);
console.log(triangle.describe()); // 面積: 6.00, 周囲: 12.00
```

### 課題2-3: ショッピングカート

インターフェースを使ってショッピングカートを実装してください。

```typescript
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Cart {
  items: CartItem[];
  addItem(item: Omit<CartItem, "quantity">, quantity?: number): void;
  removeItem(id: number): void;
  updateQuantity(id: number, quantity: number): void;
  getTotal(): number;
  getItemCount(): number;
}

class ShoppingCart implements Cart {
  // 実装
}

// テストコード
const cart = new ShoppingCart();

cart.addItem({ id: 1, name: "Apple", price: 100 }, 3);
cart.addItem({ id: 2, name: "Banana", price: 80 }, 2);

console.log(cart.getTotal());     // 460
console.log(cart.getItemCount()); // 5

cart.updateQuantity(1, 5);
console.log(cart.getTotal());     // 660

cart.removeItem(2);
console.log(cart.getTotal());     // 500
```

## ✅ 完了条件

- [ ] すべてのクラスが仕様通りに動作する
- [ ] 適切なアクセス修飾子を使用している
- [ ] インターフェースを正しく実装している

## 📤 提出物

- 作成したTypeScriptファイル（`exercise-02.ts`）

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../../docs/terms-of-use.md)をご覧ください。
