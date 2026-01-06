# GPIOとセンサー

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [中級] |
| 所要時間 | 1-2時間 |
| 前提知識 | マイコンプログラミング、Node.js on Raspberry Pi |

## なぜ学ぶ必要があるのか

### GPIOとセンサーが解決する問題

GPIO（General Purpose Input/Output）を使うことで、マイコンやRaspberry Piと外部デバイス（センサー、アクチュエーター）を接続できます。

## GPIOの基本

### Raspberry PiでのGPIO制御

```typescript
import { Gpio } from 'onoff';

// LED制御
const led = new Gpio(17, 'out');

// センサー読み取り
const sensor = new Gpio(18, 'in', 'both');

sensor.watch((err, value) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Sensor value: ${value}`);
});
```

### センサーライブラリ

```typescript
// DHT11（温度・湿度センサー）の例
import { DHT11 } from 'node-dht-sensor';

const sensor = new DHT11(4); // GPIO 4

setInterval(() => {
  const data = sensor.read();
  console.log(`Temperature: ${data.temperature}°C`);
  console.log(`Humidity: ${data.humidity}%`);
}, 2000);
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] GPIOを制御できる
- [ ] センサーからデータを取得できる
- [ ] アクチュエーターを制御できる

## 次のステップ

- [05. リアルタイムシステム](02-embedded-systems-05.md)

## 参考リソース

- [onoffライブラリ](https://github.com/fivdi/onoff)

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../docs/terms-of-use.md)をご覧ください。
