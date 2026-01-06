# パフォーマンス最適化

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [応用] |
| 所要時間 | 1-2時間 |
| 前提知識 | フルスタック実践 |

## なぜ学ぶ必要があるのか

### パフォーマンス最適化が解決する問題

- **ユーザー体験**: 高速なアプリケーションはユーザー満足度が高い
- **SEO**: ページ速度は検索エンジンの評価に影響
- **コスト**: 効率的なアプリケーションはサーバーコストを削減

## フロントエンド最適化

### コード分割

```typescript
// 動的インポート
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

### 画像最適化

```typescript
import Image from 'next/image';

<Image
  src="/image.jpg"
  width={500}
  height={300}
  alt="Description"
  priority // 重要画像の場合
/>
```

### キャッシング

```typescript
// SWR
import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetcher);
  
  if (error) return <div>Error</div>;
  if (!data) return <div>Loading...</div>;
  return <div>{data.name}</div>;
}
```

## バックエンド最適化

### データベースクエリ最適化

```typescript
// N+1問題の解決
const users = await prisma.user.findMany({
  include: { posts: true }, // JOINで一度に取得
});
```

### キャッシング

```typescript
import Redis from 'ioredis';

const redis = new Redis();

async function getCachedData(key: string) {
  const cached = await redis.get(key);
  if (cached) {
    return JSON.parse(cached);
  }
  
  const data = await fetchData();
  await redis.setex(key, 3600, JSON.stringify(data));
  return data;
}
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] フロントエンドのパフォーマンスを最適化できる
- [ ] バックエンドのパフォーマンスを最適化できる
- [ ] キャッシング戦略を理解している

## 次のステップ

- [05. 応用演習](../05-capstone-project/)

## 参考リソース

- [Web.dev: Performance](https://web.dev/performance/)

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../docs/terms-of-use.md)をご覧ください。
