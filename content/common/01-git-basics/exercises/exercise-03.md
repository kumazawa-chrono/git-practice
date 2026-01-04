# 課題3: Pull Requestの作成

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐⭐ |
| 所要時間 | 60分 |

## 🎯 目標

GitHubでPull Requestを作成し、レビューを受ける流れを体験する。

## 📝 課題内容

### Step 1: GitHubリポジトリの作成

1. GitHubで新しいリポジトリを作成
   - 名前: `git-practice`
   - Public または Private
   - READMEは追加しない（後でpushするため）

2. ローカルリポジトリとリモートを接続:

```bash
cd git-practice
git remote add origin https://github.com/YOUR_USERNAME/git-practice.git
git push -u origin main
```

### Step 2: featureブランチで新機能を追加

1. mainを最新に:

```bash
git checkout main
git pull origin main
```

2. 新しいブランチを作成:

```bash
git checkout -b feature/add-about-page
```

3. `about.html`を作成:

```html
<!DOCTYPE html>
<html>
<head>
    <title>About - Git Practice</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>About</h1>
    <p>This is a Git practice project.</p>
    <a href="index.html">Back to Home</a>
</body>
</html>
```

4. `index.html`にリンクを追加:

```html
<a href="about.html">About</a>
```

5. コミット:

```bash
git add .
git commit -m "Add about page"
```

### Step 3: GitHubにPush

```bash
git push -u origin feature/add-about-page
```

### Step 4: Pull Requestの作成

1. GitHubで「Compare & pull request」をクリック

2. 以下のテンプレートでPRを作成:

```markdown
## 概要
Aboutページを追加しました。

## 変更内容
- about.htmlを新規作成
- index.htmlにAboutページへのリンクを追加

## 確認方法
1. index.htmlをブラウザで開く
2. 「About」リンクをクリック
3. Aboutページが表示されることを確認

## スクリーンショット
（あれば添付）
```

3. 「Create pull request」をクリック

### Step 5: セルフレビュー（本来はチームメンバーがレビュー）

1. 「Files changed」タブで変更内容を確認

2. コメントを追加する練習:
   - 行にカーソルを合わせて「+」をクリック
   - コメントを入力

### Step 6: マージ

1. 「Merge pull request」をクリック
2. 「Confirm merge」をクリック
3. 「Delete branch」でリモートブランチを削除

### Step 7: ローカルの更新

```bash
git checkout main
git pull origin main
git branch -d feature/add-about-page
```

## ✅ 完了条件

- [ ] GitHubにリポジトリを作成できた
- [ ] Pull Requestを作成できた
- [ ] PRの説明を適切に書けた
- [ ] マージできた

## 📤 提出物

- 作成したPull RequestのURL
- マージ後の`git log --oneline`の出力
