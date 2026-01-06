# 課題1: SOLID原則の適用

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐⭐ |
| 所要時間 | 45分 |

## 🎯 目標

SOLID原則に違反しているコードを特定し、リファクタリングする。

## 📝 課題内容

### 課題1-1: 単一責任の原則（SRP）

以下のコードはSRPに違反しています。問題点を指摘し、リファクタリングしてください。

```typescript
class Employee {
  constructor(
    public name: string,
    public salary: number,
    public department: string
  ) {}

  // 給与計算
  calculatePay(): number {
    const basePay = this.salary;
    const bonus = this.department === "sales" ? basePay * 0.1 : 0;
    return basePay + bonus;
  }

  // レポート生成
  generateReport(): string {
    return `
      Employee Report
      ===============
      Name: ${this.name}
      Department: ${this.department}
      Monthly Pay: ${this.calculatePay()}
    `;
  }

  // データベースに保存
  save(): void {
    console.log(`Saving ${this.name} to database...`);
    // データベース操作
  }

  // メール送信
  sendEmail(message: string): void {
    console.log(`Sending email to ${this.name}: ${message}`);
  }
}
```

### 課題1-2: 開放閉鎖の原則（OCP）

以下のコードはOCPに違反しています。新しい図形を追加しやすい設計にリファクタリングしてください。

```typescript
class AreaCalculator {
  calculate(shape: any): number {
    if (shape.type === "circle") {
      return Math.PI * shape.radius ** 2;
    } else if (shape.type === "rectangle") {
      return shape.width * shape.height;
    } else if (shape.type === "triangle") {
      return (shape.base * shape.height) / 2;
    }
    throw new Error("Unknown shape");
  }
}

// 使用例
const calculator = new AreaCalculator();
console.log(calculator.calculate({ type: "circle", radius: 5 }));
console.log(calculator.calculate({ type: "rectangle", width: 4, height: 5 }));
```

### 課題1-3: 依存性逆転の原則（DIP）

以下のコードはDIPに違反しています。抽象に依存するようにリファクタリングしてください。

```typescript
class MySQLDatabase {
  query(sql: string): any[] {
    console.log(`MySQL: ${sql}`);
    return [];
  }
}

class UserRepository {
  private db = new MySQLDatabase();

  findAll(): any[] {
    return this.db.query("SELECT * FROM users");
  }

  findById(id: number): any {
    return this.db.query(`SELECT * FROM users WHERE id = ${id}`)[0];
  }
}

// テストが困難：MySQLに依存している
```

## ✅ 完了条件

- [ ] 各コードの問題点を説明できる
- [ ] SOLID原則に従ったコードにリファクタリングできた
- [ ] リファクタリング後のコードが動作する

## 📤 提出物

- リファクタリング後のコード（`exercise-01.ts`）
- 各問題の問題点と解決方法の説明（コメントまたは別ファイル）

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../../docs/terms-of-use.md)をご覧ください。
