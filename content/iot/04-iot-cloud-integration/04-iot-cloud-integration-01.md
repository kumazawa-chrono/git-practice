# AWS IoT基礎

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [中級] |
| 所要時間 | 1-2時間 |
| 前提知識 | IoTプロトコル |

## なぜ学ぶ必要があるのか

### AWS IoTが解決する問題

AWS IoTは、大量のIoTデバイスを管理し、データを収集・分析するためのプラットフォームです。

## AWS IoT Core

### Thing（デバイス）の登録

```typescript
import { IoTClient, CreateThingCommand } from '@aws-sdk/client-iot';

const client = new IoTClient({ region: 'ap-northeast-1' });

const command = new CreateThingCommand({
  thingName: 'my-device-001',
});

await client.send(command);
```

### デバイスからのデータ送信

```typescript
import mqtt from 'mqtt';

const client = mqtt.connect({
  host: 'your-endpoint.iot.ap-northeast-1.amazonaws.com',
  port: 8883,
  protocol: 'mqtts',
  // 証明書設定
});

client.publish('sensor/data', JSON.stringify({
  temperature: 25.5,
  humidity: 60,
}));
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] AWS IoT Coreの基本を理解している
- [ ] Thingを登録できる
- [ ] デバイスからデータを送信できる

## 次のステップ

- [02. デバイス連携](04-iot-cloud-integration-02.md)

## 参考リソース

- [AWS IoT Core公式ドキュメント](https://docs.aws.amazon.com/iot/)

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../docs/terms-of-use.md)をご覧ください。
