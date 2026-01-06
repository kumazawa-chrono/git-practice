# 課題3: リファクタリング

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐⭐⭐ |
| 所要時間 | 90分 |

## 🎯 目標

品質の低いコードを、設計原則に従ってリファクタリングする。

## 📝 課題内容

以下の「スパゲッティコード」をリファクタリングしてください。

### リファクタリング対象

```typescript
// 注文処理システム（問題だらけのコード）
class OrderSystem {
  process(data: any) {
    // バリデーション
    if (!data.items || data.items.length === 0) {
      console.log("ERROR: No items");
      return { success: false, error: "No items" };
    }
    if (!data.customer || !data.customer.email) {
      console.log("ERROR: Invalid customer");
      return { success: false, error: "Invalid customer" };
    }
    if (!data.customer.email.includes("@")) {
      console.log("ERROR: Invalid email");
      return { success: false, error: "Invalid email" };
    }

    // 合計計算
    let total = 0;
    for (let i = 0; i < data.items.length; i++) {
      total += data.items[i].price * data.items[i].qty;
    }

    // 割引適用
    if (data.coupon === "SAVE10") {
      total = total * 0.9;
    } else if (data.coupon === "SAVE20") {
      total = total * 0.8;
    } else if (data.coupon === "FREESHIP") {
      // 送料無料（後で処理）
    }

    // 送料計算
    let shipping = 0;
    if (data.shipping === "standard") {
      shipping = 500;
    } else if (data.shipping === "express") {
      shipping = 1000;
    } else if (data.shipping === "nextday") {
      shipping = 2000;
    }
    
    if (data.coupon === "FREESHIP") {
      shipping = 0;
    }

    // 税金計算
    const tax = total * 0.1;
    const finalTotal = total + tax + shipping;

    // 在庫チェック
    for (let i = 0; i < data.items.length; i++) {
      const stock = this.checkStock(data.items[i].id);
      if (stock < data.items[i].qty) {
        console.log("ERROR: Out of stock: " + data.items[i].name);
        return { success: false, error: "Out of stock: " + data.items[i].name };
      }
    }

    // 注文保存
    const orderId = Date.now().toString();
    console.log("Saving order: " + orderId);
    // DB保存処理（省略）

    // メール送信
    console.log("Sending email to: " + data.customer.email);
    console.log("Order confirmation: " + orderId);
    console.log("Total: " + finalTotal);

    return {
      success: true,
      orderId: orderId,
      total: finalTotal,
      subtotal: total,
      tax: tax,
      shipping: shipping
    };
  }

  checkStock(itemId: string): number {
    // 仮の在庫データ
    const stocks: { [key: string]: number } = {
      "item1": 10,
      "item2": 5,
      "item3": 0
    };
    return stocks[itemId] || 0;
  }
}
```

### リファクタリング要件

1. **型を定義する**
   - Order, Customer, Item, OrderResult などのインターフェース

2. **責任を分離する**
   - バリデーション → Validator クラス
   - 計算 → Calculator クラス
   - 在庫管理 → InventoryService
   - 通知 → NotificationService
   - 永続化 → OrderRepository

3. **設計パターンを適用する**
   - Strategy: 割引計算、送料計算
   - Factory: 割引戦略の生成

4. **コード品質を改善する**
   - 意味のある変数名
   - 早期リターン
   - マジックナンバーの排除

### 期待する構成

```
src/
├── types/
│   └── order.ts          # 型定義
├── validators/
│   └── orderValidator.ts  # バリデーション
├── services/
│   ├── pricingService.ts  # 価格計算
│   ├── inventoryService.ts # 在庫管理
│   └── notificationService.ts # 通知
├── strategies/
│   ├── discountStrategy.ts # 割引戦略
│   └── shippingStrategy.ts # 配送戦略
├── repositories/
│   └── orderRepository.ts  # データ永続化
└── orderProcessor.ts       # メイン処理（統合）
```

### テストコード

リファクタリング後、以下のテストが通ることを確認してください。

```typescript
const processor = new OrderProcessor(
  new OrderValidator(),
  new PricingService(),
  new InventoryService(),
  new NotificationService(),
  new OrderRepository()
);

const result = processor.process({
  customer: {
    name: "Alice",
    email: "alice@example.com"
  },
  items: [
    { id: "item1", name: "Book", price: 1000, qty: 2 },
    { id: "item2", name: "Pen", price: 100, qty: 5 }
  ],
  coupon: "SAVE10",
  shipping: "standard"
});

console.log(result);
// {
//   success: true,
//   orderId: "...",
//   subtotal: 2250, // (1000*2 + 100*5) * 0.9
//   tax: 225,
//   shipping: 500,
//   total: 2975
// }
```

## ✅ 完了条件

- [ ] 型が適切に定義されている
- [ ] 責任が適切に分離されている
- [ ] 設計パターンが適用されている
- [ ] コードが読みやすくなっている
- [ ] テストコードが通る

## 💡 ヒント

<details>
<summary>型定義のヒント</summary>

```typescript
interface Customer {
  name: string;
  email: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface OrderInput {
  customer: Customer;
  items: OrderItem[];
  coupon?: string;
  shipping: "standard" | "express" | "nextday";
}
```

</details>

## 📤 提出物

- リファクタリング後のソースコード一式
- リファクタリングのポイント説明（コメントまたは別ファイル）

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../../docs/terms-of-use.md)をご覧ください。
