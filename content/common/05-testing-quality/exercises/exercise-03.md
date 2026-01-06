# 課題3: TDDで機能開発

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐⭐⭐ |
| 所要時間 | 90分 |

## 🎯 目標

TDD（テスト駆動開発）の流れで機能を実装する。

## 📝 課題内容

### ショッピングカートをTDDで実装

以下の仕様を満たすショッピングカートをTDDで実装してください。

**仕様**:
- 商品を追加できる
- 商品を削除できる
- 数量を変更できる
- 合計金額を計算できる
- 割引を適用できる
- 在庫チェックができる

### Step 1: 最初のテスト（Red）

```typescript
// cart.test.ts
import { describe, test, expect } from 'vitest';
import { Cart } from './cart';

describe('Cart', () => {
  test('空のカートは合計0円', () => {
    const cart = new Cart();
    expect(cart.getTotal()).toBe(0);
  });
});
```

### Step 2: 実装（Green）

```typescript
// cart.ts
export class Cart {
  getTotal(): number {
    return 0;
  }
}
```

### Step 3: 次のテストを追加（Red）

```typescript
test('商品を追加すると合計に反映される', () => {
  const cart = new Cart();
  cart.addItem({ id: '1', name: 'Apple', price: 100 });
  expect(cart.getTotal()).toBe(100);
});
```

### 実装すべき機能

1. **基本機能**
```typescript
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class Cart {
  addItem(item: Omit<CartItem, 'quantity'>, quantity?: number): void;
  removeItem(id: string): void;
  updateQuantity(id: string, quantity: number): void;
  getItems(): CartItem[];
  getTotal(): number;
  getItemCount(): number;
  clear(): void;
}
```

2. **割引機能**
```typescript
interface Discount {
  type: 'percentage' | 'fixed';
  value: number;
}

class Cart {
  applyDiscount(discount: Discount): void;
  removeDiscount(): void;
  getDiscountAmount(): number;
  getFinalTotal(): number;
}
```

3. **在庫チェック**
```typescript
interface InventoryService {
  checkStock(id: string): Promise<number>;
}

class Cart {
  constructor(inventory?: InventoryService);
  validateStock(): Promise<{ valid: boolean; outOfStock: string[] }>;
}
```

### TDDの流れを記録

各テストについて、以下を記録してください:

1. 書いたテスト（Red）
2. 最小限の実装（Green）
3. リファクタリング（Refactor）

## ✅ 完了条件

- [ ] TDDの流れ（Red→Green→Refactor）で実装した
- [ ] 基本機能のテストがすべて通る
- [ ] 割引機能のテストがすべて通る
- [ ] 在庫チェック機能のテストがすべて通る
- [ ] カバレッジ80%以上

## 📤 提出物

- `cart.ts`（実装）
- `cart.test.ts`（テスト）
- TDDの流れを記録したドキュメント

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../../docs/terms-of-use.md)をご覧ください。
