# 課題1: 基本的なテスト

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐ |
| 所要時間 | 45分 |

## 🎯 目標

基本的な単体テストを書けるようになる。

## 📝 課題内容

### 課題1-1: 文字列処理関数のテスト

以下の関数にテストを書いてください。

```typescript
// stringUtils.ts
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + '...';
}

export function countWords(str: string): number {
  if (!str.trim()) return 0;
  return str.trim().split(/\s+/).length;
}
```

テストすべきケース:
- 正常系
- 空文字
- 境界値

### 課題1-2: 配列処理関数のテスト

```typescript
// arrayUtils.ts
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

export function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export function flatten<T>(arr: (T | T[])[]): T[] {
  return arr.flat() as T[];
}
```

### 課題1-3: バリデーション関数のテスト

```typescript
// validators.ts
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function isValidPassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (password.length < 8) errors.push('8文字以上必要です');
  if (!/[A-Z]/.test(password)) errors.push('大文字を含めてください');
  if (!/[a-z]/.test(password)) errors.push('小文字を含めてください');
  if (!/[0-9]/.test(password)) errors.push('数字を含めてください');
  return { valid: errors.length === 0, errors };
}
```

## ✅ 完了条件

- [ ] 各関数に3つ以上のテストケースがある
- [ ] 正常系と異常系の両方をテストしている
- [ ] すべてのテストが通る

## 📤 提出物

- テストファイル（`*.test.ts`）
