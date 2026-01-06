# 単体テスト

## 📋 概要

| 項目 | 内容 |
|------|------|
| 所要時間 | 60分 |
| 難易度 | [基礎] |
| 前提知識 | テストの種類 |

## 🎯 なぜこれを学ぶのか

単体テストは最も頻繁に書くテストです。Jest/Vitestを使った実践的なテストの書き方を習得します。

## 📚 学習内容

### 1. 環境構築

```bash
# Vitestを使用（推奨）
npm install vitest -D

# package.jsonにscript追加
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

### 2. 基本的なテスト

```typescript
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

// math.test.ts
import { describe, test, expect } from 'vitest';
import { add, multiply } from './math';

describe('math関数', () => {
  test('addは2つの数を足す', () => {
    expect(add(1, 2)).toBe(3);
  });

  test('multiplyは2つの数を掛ける', () => {
    expect(multiply(2, 3)).toBe(6);
  });
});
```

### 3. よく使うマッチャー

```typescript
// 等価性
expect(value).toBe(3);           // 厳密等価（===）
expect(value).toEqual({ a: 1 }); // オブジェクトの内容比較

// 真偽値
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// 数値
expect(value).toBeGreaterThan(3);
expect(value).toBeGreaterThanOrEqual(3);
expect(value).toBeLessThan(5);
expect(value).toBeCloseTo(0.3, 2); // 小数点の比較

// 文字列
expect(value).toMatch(/regex/);
expect(value).toContain('substr');

// 配列
expect(array).toContain(item);
expect(array).toHaveLength(3);

// 例外
expect(() => fn()).toThrow();
expect(() => fn()).toThrow('error message');
expect(() => fn()).toThrow(ErrorClass);
```

### 4. 非同期テスト

```typescript
// async/await
test('非同期処理のテスト', async () => {
  const result = await fetchData();
  expect(result).toBe('data');
});

// Promise
test('Promiseのテスト', () => {
  return fetchData().then(result => {
    expect(result).toBe('data');
  });
});
```

### 5. モック（Mock）

```typescript
import { vi, describe, test, expect } from 'vitest';

// 関数のモック
const mockFn = vi.fn();
mockFn.mockReturnValue('mocked');

test('モック関数', () => {
  expect(mockFn()).toBe('mocked');
  expect(mockFn).toHaveBeenCalled();
  expect(mockFn).toHaveBeenCalledTimes(1);
});

// モジュールのモック
vi.mock('./api', () => ({
  fetchUser: vi.fn().mockResolvedValue({ name: 'Alice' })
}));

import { fetchUser } from './api';

test('APIモック', async () => {
  const user = await fetchUser(1);
  expect(user.name).toBe('Alice');
});
```

### 6. セットアップとクリーンアップ

```typescript
describe('UserService', () => {
  let service: UserService;

  // 各テストの前に実行
  beforeEach(() => {
    service = new UserService();
  });

  // 各テストの後に実行
  afterEach(() => {
    service.cleanup();
  });

  // 全テストの前に1回実行
  beforeAll(async () => {
    await setupDatabase();
  });

  // 全テストの後に1回実行
  afterAll(async () => {
    await teardownDatabase();
  });

  test('test1', () => { /* ... */ });
  test('test2', () => { /* ... */ });
});
```

### 7. テストの構造（AAA パターン）

```typescript
test('ユーザー作成', () => {
  // Arrange（準備）
  const name = 'Alice';
  const email = 'alice@example.com';
  
  // Act（実行）
  const user = createUser(name, email);
  
  // Assert（検証）
  expect(user.name).toBe(name);
  expect(user.email).toBe(email);
});
```

### 8. 実践的な例

```typescript
// userService.ts
export class UserService {
  constructor(private repository: UserRepository) {}

  async createUser(name: string, email: string): Promise<User> {
    if (!email.includes('@')) {
      throw new ValidationError('Invalid email');
    }
    return this.repository.save({ name, email });
  }
}

// userService.test.ts
import { describe, test, expect, vi, beforeEach } from 'vitest';

describe('UserService', () => {
  let service: UserService;
  let mockRepository: UserRepository;

  beforeEach(() => {
    mockRepository = {
      save: vi.fn().mockResolvedValue({ id: '1', name: 'Alice', email: 'alice@example.com' })
    };
    service = new UserService(mockRepository);
  });

  test('正常にユーザーを作成できる', async () => {
    const user = await service.createUser('Alice', 'alice@example.com');
    
    expect(user.name).toBe('Alice');
    expect(mockRepository.save).toHaveBeenCalledWith({
      name: 'Alice',
      email: 'alice@example.com'
    });
  });

  test('無効なメールでエラーを投げる', async () => {
    await expect(service.createUser('Alice', 'invalid'))
      .rejects.toThrow('Invalid email');
  });
});
```

## ✅ まとめ

| 概念 | ポイント |
|------|---------|
| マッチャー | toBe, toEqual, toThrow など |
| モック | 依存を置き換えて独立させる |
| AAA | Arrange, Act, Assert |
| セットアップ | beforeEach, afterEach |

## 💬 考えてみよう

```
Q: モックを使う理由は何ですか？
Q: toBeとtoEqualの違いは何ですか？
Q: 1つのテストでいくつのことをテストすべきですか？
```

## 🔗 次のコンテンツ

[TDD](05-testing-quality-03.md)に進んでください。

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../docs/terms-of-use.md)をご覧ください。
