# 課題1: 基本コマンドの練習

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐ |
| 所要時間 | 30分 |

## 🎯 目標

Gitの基本的なワークフロー（init → add → commit → log）を体験する。

## 📝 課題内容

### Step 1: リポジトリの作成

```bash
# 作業ディレクトリを作成
mkdir git-practice
cd git-practice

# Gitリポジトリを初期化
git init
```

**確認**: `ls -la`で`.git`ディレクトリが作成されていることを確認

### Step 2: ファイルの作成とコミット

1. `README.md`を作成:

```bash
echo "# Git Practice" > README.md
```

2. 状態を確認:

```bash
git status
```

3. ステージに追加:

```bash
git add README.md
```

4. 再度状態を確認:

```bash
git status
```

5. コミット:

```bash
git commit -m "Initial commit: Add README"
```

### Step 3: 追加の変更

1. `README.md`を編集（好きな内容を追加）

2. 新しいファイル`index.html`を作成:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Git Practice</title>
</head>
<body>
    <h1>Hello Git!</h1>
</body>
</html>
```

3. 変更を確認:

```bash
git status
git diff
```

4. すべての変更をコミット:

```bash
git add .
git commit -m "Add index.html and update README"
```

### Step 4: 履歴の確認

```bash
# コミット履歴を表示
git log

# 1行で表示
git log --oneline
```

### Step 5: 変更の取り消し練習

1. `README.md`を編集して何か追加

2. 変更を確認:

```bash
git diff
```

3. 変更を取り消す:

```bash
git restore README.md
```

4. 元に戻っていることを確認:

```bash
git diff
cat README.md
```

## ✅ 完了条件

- [ ] リポジトリを初期化できた
- [ ] 2回以上のコミットがある
- [ ] `git log`で履歴が確認できる
- [ ] `git restore`で変更を取り消せた

## 📤 提出物

以下のコマンドの出力をスクリーンショットまたはテキストで提出:

```bash
git log --oneline
```

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../../docs/terms-of-use.md)をご覧ください。
