# ネイティブモジュール連携

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [中級] |
| 所要時間 | 1-2時間 |
| 前提知識 | React Native基礎 |

## なぜ学ぶ必要があるのか

### ネイティブモジュール連携が解決する問題

カメラ、GPS等のネイティブ機能を使うために、ネイティブモジュールと連携する必要があります。

## カメラ

```typescript
import { launchCamera } from 'react-native-image-picker';

launchCamera({ mediaType: 'photo' }, (response) => {
  if (response.assets) {
    console.log(response.assets[0].uri);
  }
});
```

## GPS

```typescript
import Geolocation from '@react-native-community/geolocation';

Geolocation.getCurrentPosition(
  (position) => {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  },
  (error) => console.error(error)
);
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] カメラを使える
- [ ] GPSを使える
- [ ] ネイティブモジュールと連携できる

## 次のステップ

- [04. Expo](04-cross-platform-04.md)

## 参考リソース

- [React Native Native Modules](https://reactnative.dev/docs/native-modules-intro)
