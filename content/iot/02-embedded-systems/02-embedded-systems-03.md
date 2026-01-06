# Node.js on Raspberry Pi

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [基礎] |
| 所要時間 | 45-60分 |
| 前提知識 | Node.js基礎 |

## なぜ学ぶ必要があるのか

### Node.js on Raspberry Piが解決する問題

Raspberry Pi上でNode.jsを動かすことで、TypeScriptの知識を活かしてIoT開発ができます。

## セットアップ

### Raspberry Pi OSのインストール

1. Raspberry Pi ImagerでOSを書き込み
2. SSHを有効化
3. ネットワーク接続

### Node.jsのインストール

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## GPIO制御

```typescript
import { Gpio } from 'onoff';

const led = new Gpio(17, 'out');

// LED点灯
led.writeSync(1);

// LED消灯
led.writeSync(0);
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] Raspberry PiにNode.jsをインストールできる
- [ ] GPIOを制御できる

## 次のステップ

- [04. GPIOとセンサー](02-embedded-systems-04.md)

## 参考リソース

- [Raspberry Pi公式ドキュメント](https://www.raspberrypi.org/documentation/)

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../docs/terms-of-use.md)をご覧ください。
