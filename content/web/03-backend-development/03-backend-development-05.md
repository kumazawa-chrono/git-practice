# 外部API連携

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [中級] |
| 所要時間 | 45-60分 |
| 前提知識 | Node.js基礎 |

## なぜ学ぶ必要があるのか

### 外部API連携が解決する問題

- **機能の拡張**: 既存のサービスを活用
- **開発効率**: 自前で実装する必要がない
- **コスト削減**: インフラを自前で用意する必要がない

## HTTPクライアント

### fetch

```typescript
async function fetchExternalAPI() {
  const response = await fetch('https://api.example.com/data', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return await response.json();
}
```

### axios

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Authorization': `Bearer ${token}`,
  },
});

async function fetchData() {
  try {
    const response = await api.get('/data');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', error.response?.data);
    }
    throw error;
  }
}
```

## エラーハンドリング

```typescript
async function callExternalAPI() {
  try {
    const data = await fetchExternalAPI();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      // リトライロジック
      if (error.message.includes('timeout')) {
        return retry(fetchExternalAPI, 3);
      }
    }
    throw error;
  }
}
```

## レート制限

```typescript
import pLimit from 'p-limit';

const limit = pLimit(5); // 同時に5リクエストまで

const requests = urls.map(url =>
  limit(() => fetch(url))
);

await Promise.all(requests);
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] 外部APIを呼び出せる
- [ ] エラーハンドリングができる
- [ ] レート制限を考慮できる

## 次のステップ

- [04. フルスタック実践](../04-fullstack-practice/)

## 参考リソース

- [axios公式ドキュメント](https://axios-http.com/)
