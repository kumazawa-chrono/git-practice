# iOSアーキテクチャ

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [中級] |
| 所要時間 | 1-2時間 |
| 前提知識 | SwiftUI/UIKit |

## なぜ学ぶ必要があるのか

### アーキテクチャが解決する問題

適切なアーキテクチャにより、保守性の高いコードを書けます。

## MVVMパターン

```swift
// Model
struct User {
    let name: String
    let email: String
}

// ViewModel
class UserViewModel: ObservableObject {
    @Published var user: User?
    
    func loadUser() {
        // データ取得
        user = User(name: "John", email: "john@example.com")
    }
}

// View
struct UserView: View {
    @StateObject private var viewModel = UserViewModel()
    
    var body: some View {
        VStack {
            if let user = viewModel.user {
                Text(user.name)
                Text(user.email)
            }
        }
        .onAppear {
            viewModel.loadUser()
        }
    }
}
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] MVVMパターンを理解している
- [ ] MVVMでアプリを構築できる

## 次のステップ

- [05. App Store公開](02-ios-development-05.md)

## 参考リソース

- [Apple Developer: App Architecture](https://developer.apple.com/documentation/architecture)
