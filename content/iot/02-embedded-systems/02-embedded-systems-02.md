# マイコンプログラミング

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [中級] |
| 所要時間 | 1-2時間 |
| 前提知識 | C/C++基礎 |

## なぜ学ぶ必要があるのか

### マイコンプログラミングが解決する問題

マイコンは、IoTデバイスの頭脳です。マイコンを制御することで、センサーからデータを取得し、アクチュエーターを制御できます。

## Arduino

### 基本的なスケッチ

```cpp
void setup() {
  pinMode(13, OUTPUT);  // LEDピンを出力に設定
}

void loop() {
  digitalWrite(13, HIGH);  // LED点灯
  delay(1000);              // 1秒待機
  digitalWrite(13, LOW);   // LED消灯
  delay(1000);
}
```

### センサー読み取り

```cpp
void setup() {
  Serial.begin(9600);
}

void loop() {
  int sensorValue = analogRead(A0);
  Serial.println(sensorValue);
  delay(100);
}
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] Arduinoで基本的なプログラムを書ける
- [ ] センサーからデータを取得できる

## 次のステップ

- [03. Node.js on Raspberry Pi](02-embedded-systems-03.md)

## 参考リソース

- [Arduino公式リファレンス](https://www.arduino.cc/reference/en/)
