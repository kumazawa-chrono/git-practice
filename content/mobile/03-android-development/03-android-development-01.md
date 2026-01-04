# Kotlin基礎

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [基礎] |
| 所要時間 | 1-2時間 |
| 前提知識 | プログラミング基礎 |

## なぜ学ぶ必要があるのか

### Kotlinが解決する問題

Kotlinは、Android開発のためのモダンなプログラミング言語です。

## Kotlinの基本

### 変数と定数

```kotlin
var name = "John"  // 変数
val age = 30       // 定数（読み取り専用）
```

### 型推論

```kotlin
val number = 42        // Int
val text = "Hello"     // String
val isActive = true    // Boolean
```

### 関数

```kotlin
fun greet(name: String): String {
    return "Hello, $name!"
}

// 使用
val message = greet("World")
```

### クラス

```kotlin
class User(val name: String, val age: Int) {
    fun introduce(): String {
        return "I'm $name, $age years old"
    }
}
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] Kotlinの基本構文を使える
- [ ] 関数とクラスを定義できる

## 次のステップ

- [02. Android SDK](03-android-development-02.md)

## 参考リソース

- [Kotlin公式ドキュメント](https://kotlinlang.org/docs/home.html)
