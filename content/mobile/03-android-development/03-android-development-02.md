# Android SDK

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [中級] |
| 所要時間 | 1-2時間 |
| 前提知識 | Kotlin基礎 |

## なぜ学ぶ必要があるのか

### Android SDKが解決する問題

Android SDKは、Androidアプリを開発するためのツールとライブラリのセットです。

## Activity

### 基本的なActivity

```kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] Activityを作成できる
- [ ] レイアウトを設定できる

## 次のステップ

- [03. Jetpack Compose](03-android-development-03.md)

## 参考リソース

- [Android Developers](https://developer.android.com/)
