# Swift基礎

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [基礎] |
| 所要時間 | 1-2時間 |
| 前提知識 | プログラミング基礎 |

## なぜ学ぶ必要があるのか

### Swiftが解決する問題

Swiftは、iOS開発のためのモダンなプログラミング言語です。

## Swiftの基本

### 変数と定数

```swift
var name = "John"  // 変数
let age = 30       // 定数
```

### 型推論

```swift
let number = 42        // Int
let text = "Hello"     // String
let isActive = true    // Bool
```

### 型アノテーション

```swift
let name: String = "John"
let age: Int = 30
```

### 関数

```swift
func greet(name: String) -> String {
    return "Hello, \(name)!"
}

// 使用
let message = greet(name: "World")
```

### クラス

```swift
class User {
    var name: String
    var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
    
    func introduce() -> String {
        return "I'm \(name), \(age) years old"
    }
}
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] Swiftの基本構文を使える
- [ ] 変数と定数を区別できる
- [ ] 関数とクラスを定義できる

## 次のステップ

- [02. UIKit](02-ios-development-02.md)

## 参考リソース

- [Swift公式ドキュメント](https://docs.swift.org/swift-book/)

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../docs/terms-of-use.md)をご覧ください。
