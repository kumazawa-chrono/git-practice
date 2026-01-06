# ネイティブコンポーネント

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [中級] |
| 所要時間 | 1-2時間 |
| 前提知識 | React Native基礎 |

## なぜ学ぶ必要があるのか

### ネイティブコンポーネントが解決する問題

React Nativeのネイティブコンポーネントを使うことで、プラットフォーム固有のUIを実装できます。

## 基本的なコンポーネント

### View

```typescript
import { View } from 'react-native';

<View style={{ flex: 1, justifyContent: 'center' }}>
  <Text>Content</Text>
</View>
```

### Text

```typescript
import { Text } from 'react-native';

<Text style={{ fontSize: 16 }}>Hello</Text>
```

### Image

```typescript
import { Image } from 'react-native';

<Image source={{ uri: 'https://example.com/image.jpg' }} />
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] 基本的なネイティブコンポーネントを使える
- [ ] スタイリングができる

## 次のステップ

- [03. ネイティブモジュール連携](04-cross-platform-03.md)

## 参考リソース

- [React Native Components](https://reactnative.dev/docs/components-and-apis)

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../docs/terms-of-use.md)をご覧ください。
