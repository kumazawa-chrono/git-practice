# 課題1: Cursor基本操作

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐ |
| 所要時間 | 30分 |

## 🎯 目標

Cursorの基本的な機能を使いこなす。

## 📝 課題内容

### 課題1-1: インライン編集

1. 以下のコードをファイルに作成
2. 関数を選択して⌘K
3. 「TypeScriptの型を追加して」と依頼

```javascript
function greet(name) {
  return "Hello, " + name;
}

function add(a, b) {
  return a + b;
}
```

### 課題1-2: Chatで新機能生成

1. ⌘Lでチャットパネルを開く
2. 以下を依頼:

```
TypeScriptで、以下の仕様の関数を作成してください:
- 関数名: formatDate
- 引数: Date型
- 戻り値: "YYYY/MM/DD" 形式の文字列
- テストコードも含めて
```

### 課題1-3: Composerで複数ファイル生成

1. ⌘IでComposerを開く
2. 以下を依頼:

```
簡単なTodoアプリのモデルとサービスを作成してください:
- types/todo.ts - Todo型の定義
- services/todoService.ts - CRUD操作
- メモリ上で管理（DB不要）
```

## ✅ 完了条件

- [ ] インライン編集で型を追加できた
- [ ] Chatで関数を生成できた
- [ ] Composerで複数ファイルを生成できた
