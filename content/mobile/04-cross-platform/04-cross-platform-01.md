# React Native基礎

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [基礎] |
| 所要時間 | 1-2時間 |
| 前提知識 | React基礎、TypeScript |

## なぜ学ぶ必要があるのか

### React Nativeが解決する問題

React Nativeを使うことで、1つのコードベースでiOSとAndroid両方のアプリを開発できます。

## React Nativeの基本

### プロジェクト作成

```bash
npx react-native init MyApp
cd MyApp
npm start
```

### 基本的なコンポーネント

```typescript
import { View, Text, Button } from 'react-native';

function App() {
  return (
    <View>
      <Text>Hello, React Native!</Text>
      <Button title="Tap me" onPress={() => alert('Pressed')} />
    </View>
  );
}
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] React Nativeプロジェクトを作成できる
- [ ] 基本的なコンポーネントを使える

## 次のステップ

- [02. ネイティブコンポーネント](04-cross-platform-02.md)

## 参考リソース

- [React Native公式ドキュメント](https://reactnative.dev/)
