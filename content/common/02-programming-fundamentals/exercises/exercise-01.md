# 課題1: 基本構文と関数

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐ |
| 所要時間 | 45分 |

## 🎯 目標

TypeScriptの基本的な構文と関数の作成を練習する。

## 📝 課題内容

### 課題1-1: 配列操作

以下の関数を実装してください。

```typescript
// 1. 数値配列の合計を返す
function sum(numbers: number[]): number {
  // 実装
}

// 2. 数値配列の平均を返す
function average(numbers: number[]): number {
  // 実装
}

// 3. 数値配列から最大値を返す
function max(numbers: number[]): number {
  // 実装
}

// 4. 数値配列から偶数のみを返す
function filterEven(numbers: number[]): number[] {
  // 実装
}
```

**テストコード**:
```typescript
console.log(sum([1, 2, 3, 4, 5]));       // 15
console.log(average([1, 2, 3, 4, 5]));   // 3
console.log(max([1, 5, 3, 2, 4]));       // 5
console.log(filterEven([1, 2, 3, 4, 5])); // [2, 4]
```

### 課題1-2: 文字列操作

以下の関数を実装してください。

```typescript
// 1. 文字列を逆順にする
function reverse(str: string): string {
  // 実装
}

// 2. 文字列が回文かどうかを判定
function isPalindrome(str: string): boolean {
  // 実装（大文字小文字を区別しない）
}

// 3. 文字列内の単語数をカウント
function countWords(str: string): number {
  // 実装
}
```

**テストコード**:
```typescript
console.log(reverse("hello"));           // "olleh"
console.log(isPalindrome("Racecar"));    // true
console.log(isPalindrome("Hello"));      // false
console.log(countWords("Hello World")); // 2
```

### 課題1-3: オブジェクト操作

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

const products: Product[] = [
  { id: 1, name: "Apple", price: 100, category: "fruit" },
  { id: 2, name: "Banana", price: 80, category: "fruit" },
  { id: 3, name: "Carrot", price: 50, category: "vegetable" },
  { id: 4, name: "Milk", price: 200, category: "dairy" },
];

// 1. カテゴリで絞り込む
function filterByCategory(products: Product[], category: string): Product[] {
  // 実装
}

// 2. 合計金額を計算
function calculateTotal(products: Product[]): number {
  // 実装
}

// 3. 最も高い商品を取得
function getMostExpensive(products: Product[]): Product | undefined {
  // 実装
}
```

## ✅ 完了条件

- [ ] すべての関数が正しく動作する
- [ ] 型が適切に定義されている
- [ ] テストコードが通る

## 📤 提出物

- 作成したTypeScriptファイル（`exercise-01.ts`）
