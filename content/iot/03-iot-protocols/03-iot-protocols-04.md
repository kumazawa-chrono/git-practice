# プロトコル選択

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [中級] |
| 所要時間 | 30-45分 |
| 前提知識 | MQTT、無線通信 |

## なぜ学ぶ必要があるのか

### プロトコル選択が解決する問題

適切なプロトコルを選ぶことで、効率的で信頼性の高いIoTシステムを構築できます。

## 選択の指針

### 用途別の選択

| 用途 | 推奨プロトコル | 理由 |
|------|--------------|------|
| **リアルタイム監視** | MQTT | 軽量、Publish/Subscribe |
| **RESTful API** | HTTP/CoAP | 標準的、既存システムと統合 |
| **長距離・省電力** | LoRa + MQTT | 低消費電力、長距離 |
| **屋内・高速** | Wi-Fi + HTTP | 高速通信 |

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] 用途に応じてプロトコルを選択できる
- [ ] プロトコルの特徴を理解している

## 次のステップ

- [04. IoTクラウド連携](../04-iot-cloud-integration/)

## 参考リソース

- [IoT Protocol Comparison](https://www.postscapes.com/internet-of-things-protocols/)

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../docs/terms-of-use.md)をご覧ください。
