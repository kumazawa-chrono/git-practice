# Androidアーキテクチャ

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [中級] |
| 所要時間 | 1-2時間 |
| 前提知識 | Jetpack Compose |

## なぜ学ぶ必要があるのか

### アーキテクチャが解決する問題

適切なアーキテクチャにより、保守性の高いコードを書けます。

## MVVMパターン

```kotlin
// ViewModel
class UserViewModel : ViewModel() {
    private val _user = MutableStateFlow<User?>(null)
    val user: StateFlow<User?> = _user.asStateFlow()
    
    fun loadUser() {
        viewModelScope.launch {
            _user.value = repository.getUser()
        }
    }
}

// Composable
@Composable
fun UserScreen(viewModel: UserViewModel = viewModel()) {
    val user by viewModel.user.collectAsState()
    
    user?.let {
        Column {
            Text(it.name)
            Text(it.email)
        }
    }
}
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] MVVMパターンを理解している
- [ ] ViewModelを使った状態管理ができる

## 次のステップ

- [05. Google Play公開](03-android-development-05.md)

## 参考リソース

- [Android Architecture Components](https://developer.android.com/topic/architecture)

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../docs/terms-of-use.md)をご覧ください。
