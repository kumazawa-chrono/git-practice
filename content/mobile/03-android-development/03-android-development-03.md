# Jetpack Compose

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [中級] |
| 所要時間 | 1-2時間 |
| 前提知識 | Kotlin基礎 |

## なぜ学ぶ必要があるのか

### Jetpack Composeが解決する問題

Jetpack Composeは、宣言的なUIフレームワークで、XMLより簡潔にUIを構築できます。

## Composeの基本

```kotlin
@Composable
fun Greeting(name: String) {
    Text(text = "Hello, $name!")
}

@Composable
fun App() {
    Column {
        Greeting("World")
        Button(onClick = { /* ... */ }) {
            Text("Click me")
        }
    }
}
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] Jetpack ComposeでUIを作成できる
- [ ] 状態管理ができる

## 次のステップ

- [04. Androidアーキテクチャ](03-android-development-04.md)

## 参考リソース

- [Jetpack Compose公式ドキュメント](https://developer.android.com/jetpack/compose)
