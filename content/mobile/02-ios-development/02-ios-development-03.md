# SwiftUI

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [中級] |
| 所要時間 | 1-2時間 |
| 前提知識 | Swift基礎 |

## なぜ学ぶ必要があるのか

### SwiftUIが解決する問題

SwiftUIは、宣言的なUIフレームワークで、UIKitより簡潔にUIを構築できます。

## SwiftUIの基本

### View

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        Text("Hello, World!")
            .font(.title)
            .foregroundColor(.blue)
    }
}
```

### State

```swift
struct CounterView: View {
    @State private var count = 0
    
    var body: some View {
        VStack {
            Text("Count: \(count)")
            Button("Increment") {
                count += 1
            }
        }
    }
}
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] SwiftUIでViewを作成できる
- [ ] Stateで状態管理ができる

## 次のステップ

- [04. iOSアーキテクチャ](02-ios-development-04.md)

## 参考リソース

- [SwiftUI公式ドキュメント](https://developer.apple.com/xcode/swiftui/)
