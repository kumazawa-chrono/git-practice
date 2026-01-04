# 課題2: ブランチとマージ

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐⭐ |
| 所要時間 | 45分 |

## 🎯 目標

ブランチを作成し、マージする流れを体験する。コンフリクトの解決も練習する。

## 📝 課題内容

### Step 1: 準備（課題1の続き、または新規作成）

```bash
# 課題1のリポジトリを使うか、新規作成
cd git-practice  # または mkdir git-practice && cd git-practice && git init
```

### Step 2: featureブランチでの開発

1. 新しいブランチを作成して切り替え:

```bash
git checkout -b feature/add-style
```

2. `style.css`を作成:

```css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
}

h1 {
    color: blue;
}
```

3. `index.html`を編集してCSSを読み込む:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Git Practice</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Hello Git!</h1>
</body>
</html>
```

4. 変更をコミット:

```bash
git add .
git commit -m "Add style.css and link it from index.html"
```

### Step 3: mainブランチでも変更

1. mainに戻る:

```bash
git checkout main
```

2. `index.html`を編集（h1の内容を変更）:

```html
<h1>Welcome to Git Practice!</h1>
```

3. コミット:

```bash
git add index.html
git commit -m "Update h1 text in index.html"
```

### Step 4: マージ

```bash
# mainブランチで
git merge feature/add-style
```

**コンフリクトが発生した場合**:

1. `index.html`を開いてコンフリクトマーカーを確認

2. 両方の変更を活かすように編集:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Git Practice</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Welcome to Git Practice!</h1>
</body>
</html>
```

3. コンフリクトを解決してコミット:

```bash
git add index.html
git commit -m "Merge feature/add-style, resolve conflict"
```

### Step 5: ブランチの削除

```bash
git branch -d feature/add-style
```

### Step 6: 履歴の確認

```bash
git log --oneline --graph
```

## ✅ 完了条件

- [ ] featureブランチを作成できた
- [ ] 両方のブランチで変更をコミットできた
- [ ] マージできた（コンフリクトがあれば解決）
- [ ] ブランチを削除できた

## 📤 提出物

以下のコマンドの出力をスクリーンショットまたはテキストで提出:

```bash
git log --oneline --graph
git branch -a
```
