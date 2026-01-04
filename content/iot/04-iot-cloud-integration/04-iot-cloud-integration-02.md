# デバイス連携

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [中級] |
| 所要時間 | 1-2時間 |
| 前提知識 | AWS IoT基礎 |

## なぜ学ぶ必要があるのか

### デバイス連携が解決する問題

実際のIoTデバイスをクラウドと連携させることで、実用的なIoTシステムを構築できます。

## デバイス認証

### 証明書の生成

AWS IoTで証明書を生成し、デバイスにインストールします。

## データ送信

```typescript
// Raspberry Piからの例
import mqtt from 'mqtt';
import { readSensor } from './sensor';

const client = mqtt.connect({
  // AWS IoT設定
});

setInterval(() => {
  const data = readSensor();
  client.publish('sensor/data', JSON.stringify(data));
}, 5000);
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] デバイスを認証できる
- [ ] デバイスからクラウドにデータを送信できる

## 次のステップ

- [03. データ収集・分析](04-iot-cloud-integration-03.md)

## 参考リソース

- [AWS IoT Device SDK](https://github.com/aws/aws-iot-device-sdk-js)
