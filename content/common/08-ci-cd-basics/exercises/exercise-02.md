# 課題2: テスト自動化

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐⭐ |
| 所要時間 | 45分 |

## 🎯 目標

PRごとに自動テストを実行するワークフローを作成する。

## 📝 課題内容

### 準備: Node.jsプロジェクト

```bash
npm init -y
npm install vitest -D
```

`package.json`:
```json
{
  "scripts": {
    "test": "vitest run"
  }
}
```

`sum.ts`:
```typescript
export function sum(a: number, b: number): number {
  return a + b;
}
```

`sum.test.ts`:
```typescript
import { test, expect } from 'vitest';
import { sum } from './sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

### 課題2-1: テストワークフロー

`.github/workflows/test.yml`:

```yaml
name: Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
```

### 課題2-2: Lint追加

ESLintを追加:
```bash
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -D
```

ワークフローにlintステップを追加してください。

### 課題2-3: マトリックステスト

Node.js 18, 20, 22 の3バージョンでテストを実行するマトリックスを設定してください。

## ✅ 完了条件

- [ ] テストが自動実行される
- [ ] Lintが自動実行される
- [ ] 複数バージョンでテストされる
