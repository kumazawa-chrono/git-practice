# Node.js基礎

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [基礎] |
| 所要時間 | 45-60分 |
| 前提知識 | JavaScript/TypeScript基礎 |

## なぜ学ぶ必要があるのか

### Node.jsが解決する問題

```mermaid
flowchart LR
    A[ブラウザのJavaScript] --> B[サーバーサイドでも実行]
    B --> C[フロントエンドとバックエンドで同じ言語]
```

### 実務での重要性

- **フルスタック開発**: TypeScriptでフロントエンドとバックエンドを統一
- **npmエコシステム**: 豊富なパッケージが利用可能
- **非同期処理**: 高パフォーマンスなサーバーアプリケーション

## Node.jsの基本

### モジュールシステム

```typescript
// モジュールのエクスポート
export function add(a: number, b: number): number {
  return a + b;
}

// モジュールのインポート
import { add } from './math';
```

### 非同期処理

```typescript
// Promise
import fs from 'fs/promises';

async function readFile() {
  try {
    const data = await fs.readFile('file.txt', 'utf-8');
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

### イベントループ

Node.jsはシングルスレッドで非同期処理を実現します。

```typescript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');
// 出力: 1, 4, 3, 2
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] Node.jsのモジュールシステムを理解している
- [ ] 非同期処理（Promise、async/await）を使える
- [ ] イベントループの基本を理解している

## 次のステップ

- [02. Express/Fastify](03-backend-development-02.md)

## 参考リソース

- [Node.js公式ドキュメント](https://nodejs.org/ja/docs)

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../docs/terms-of-use.md)をご覧ください。
