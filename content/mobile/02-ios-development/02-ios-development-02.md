# UIKit

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [中級] |
| 所要時間 | 1-2時間 |
| 前提知識 | Swift基礎 |

## なぜ学ぶ必要があるのか

### UIKitが解決する問題

UIKitは、iOSアプリのUIを構築するためのフレームワークです。

## 基本的なコンポーネント

### UILabel

```swift
let label = UILabel()
label.text = "Hello, World!"
label.textColor = .systemBlue
label.font = .systemFont(ofSize: 16)
```

### UIButton

```swift
let button = UIButton(type: .system)
button.setTitle("Tap me", for: .normal)
button.addTarget(self, action: #selector(buttonTapped), for: .touchUpInside)
```

### UITextField

```swift
let textField = UITextField()
textField.placeholder = "Enter text"
textField.borderStyle = .roundedRect
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] UIKitの基本コンポーネントを使える
- [ ] レイアウトを設定できる

## 次のステップ

- [03. SwiftUI](02-ios-development-03.md)

## 参考リソース

- [UIKit公式ドキュメント](https://developer.apple.com/documentation/uikit)
