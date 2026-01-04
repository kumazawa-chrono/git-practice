# 課題2: 設計パターンの実装

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐⭐ |
| 所要時間 | 60分 |

## 🎯 目標

設計パターンを使って実際の問題を解決する。

## 📝 課題内容

### 課題2-1: Strategy パターン

配送料金計算システムを作成してください。

**要件**:
- 配送方法: 通常配送、速達、翌日配送
- 重量に応じて料金が変わる
- 配送方法を簡単に追加できる設計

```typescript
// 配送戦略インターフェース
interface ShippingStrategy {
  calculate(weight: number): number;
  getName(): string;
}

// 各配送方法を実装
class StandardShipping implements ShippingStrategy {
  // weight * 100円
}

class ExpressShipping implements ShippingStrategy {
  // weight * 200円 + 500円
}

class NextDayShipping implements ShippingStrategy {
  // weight * 300円 + 1000円
}

// 注文クラス
class Order {
  constructor(
    public items: { name: string; weight: number }[],
    private shippingStrategy: ShippingStrategy
  ) {}

  getTotalWeight(): number {
    // 実装
  }

  getShippingCost(): number {
    // 実装
  }

  setShippingStrategy(strategy: ShippingStrategy): void {
    // 実装
  }
}

// テストコード
const order = new Order(
  [
    { name: "本", weight: 0.5 },
    { name: "ノートPC", weight: 2.0 }
  ],
  new StandardShipping()
);

console.log(order.getShippingCost()); // 250
order.setShippingStrategy(new ExpressShipping());
console.log(order.getShippingCost()); // 1000
```

### 課題2-2: Observer パターン

株価通知システムを作成してください。

**要件**:
- 株価が変更されたら登録者に通知
- 複数の通知方法（コンソール、メール、SMS）
- 通知先を動的に追加・削除できる

```typescript
interface StockObserver {
  update(stock: string, price: number): void;
}

class Stock {
  private observers: StockObserver[] = [];
  private price: number = 0;

  constructor(public symbol: string) {}

  subscribe(observer: StockObserver): void {
    // 実装
  }

  unsubscribe(observer: StockObserver): void {
    // 実装
  }

  setPrice(price: number): void {
    // 価格を更新し、全observerに通知
  }
}

// 各通知方法を実装
class ConsoleNotifier implements StockObserver {
  // 実装
}

class EmailNotifier implements StockObserver {
  constructor(private email: string) {}
  // 実装
}

// テストコード
const apple = new Stock("AAPL");
const console1 = new ConsoleNotifier();
const email1 = new EmailNotifier("investor@example.com");

apple.subscribe(console1);
apple.subscribe(email1);

apple.setPrice(150.00);
// 出力:
// [Console] AAPL: $150.00
// [Email to investor@example.com] AAPL: $150.00
```

### 課題2-3: Factory パターン

通知ファクトリーを作成してください。

**要件**:
- 設定に応じて適切な通知クラスを生成
- 通知タイプ: email, sms, push
- 新しい通知タイプを追加しやすい設計

```typescript
interface Notification {
  send(message: string): void;
}

class EmailNotification implements Notification {
  // 実装
}

class SMSNotification implements Notification {
  // 実装
}

class PushNotification implements Notification {
  // 実装
}

class NotificationFactory {
  static create(type: "email" | "sms" | "push"): Notification {
    // 実装
  }
}

// テストコード
const email = NotificationFactory.create("email");
email.send("Hello via Email!");

const sms = NotificationFactory.create("sms");
sms.send("Hello via SMS!");
```

## ✅ 完了条件

- [ ] 各パターンが正しく実装されている
- [ ] テストコードが動作する
- [ ] パターンの使用理由を説明できる

## 📤 提出物

- 作成したTypeScriptファイル（`exercise-02.ts`）
