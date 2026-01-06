# 01. Git基礎 - 理解度チェックテスト

## 📋 テストについて

| 項目 | 内容 |
|------|------|
| 問題数 | 15問 |
| 目安時間 | 15分 |
| 合格ライン | 12問以上正解（80%） |

---

## 問題

### 【基本概念】

#### Q1. Gitの主な目的として最も適切なものはどれですか？

- A) ファイルを圧縮する
- B) コードの変更履歴を管理する
- C) プログラムを実行する
- D) ファイルを暗号化する

<details>
<summary>回答と解説</summary>

**正解: B**

Gitはバージョン管理システムで、コードの変更履歴を管理し、過去の状態に戻したり、複数人での共同開発を可能にします。

</details>

---

#### Q2. コミット（commit）の説明として正しいものはどれですか？

- A) ファイルをサーバーにアップロードすること
- B) 変更を記録したスナップショット
- C) ファイルを削除すること
- D) ブランチを作成すること

<details>
<summary>回答と解説</summary>

**正解: B**

コミットは、ある時点のファイルの状態を記録したスナップショットです。コミットにはメッセージや作成者の情報も含まれます。

</details>

---

### 【基本コマンド】

#### Q3. 新しいGitリポジトリを作成するコマンドはどれですか？

- A) `git create`
- B) `git new`
- C) `git init`
- D) `git start`

<details>
<summary>回答と解説</summary>

**正解: C**

`git init`は現在のディレクトリを新しいGitリポジトリとして初期化します。

</details>

---

#### Q4. ファイルをステージングエリアに追加するコマンドはどれですか？

- A) `git stage`
- B) `git add`
- C) `git commit`
- D) `git push`

<details>
<summary>回答と解説</summary>

**正解: B**

`git add <file>`でファイルをステージングエリアに追加します。`git add .`ですべての変更を追加できます。

</details>

---

#### Q5. 以下のコマンドの正しい順序はどれですか？

- A) commit → add → push
- B) add → push → commit
- C) push → add → commit
- D) add → commit → push

<details>
<summary>回答と解説</summary>

**正解: D**

正しい流れは：
1. `git add` - 変更をステージング
2. `git commit` - 変更を記録
3. `git push` - リモートに送信

</details>

---

#### Q6. `git pull`の説明として正しいものはどれですか？

- A) ローカルの変更をリモートに送信する
- B) リモートの変更を取得してマージする
- C) ブランチを削除する
- D) コミットを取り消す

<details>
<summary>回答と解説</summary>

**正解: B**

`git pull`はリモートリポジトリから変更を取得し、現在のブランチにマージします（`git fetch` + `git merge`）。

</details>

---

### 【ブランチ】

#### Q7. 新しいブランチを作成して切り替えるコマンドはどれですか？

- A) `git branch new-branch`
- B) `git checkout -b new-branch`
- C) `git new new-branch`
- D) `git create new-branch`

<details>
<summary>回答と解説</summary>

**正解: B**

`git checkout -b <branch>`は新しいブランチを作成して切り替えます。`git switch -c <branch>`も同じ動作をします。

</details>

---

#### Q8. ブランチを使う主な理由として最も適切なものはどれですか？

- A) ファイルサイズを小さくするため
- B) メインのコードに影響を与えずに開発するため
- C) ファイルを暗号化するため
- D) コードを高速化するため

<details>
<summary>回答と解説</summary>

**正解: B**

ブランチを使うことで、メインのコード（mainブランチ）に影響を与えずに新機能の開発やバグ修正ができます。

</details>

---

#### Q9. GitHub Flowでの基本的な開発フローとして正しいものはどれですか？

- A) main → 直接コミット → 完了
- B) main → ブランチ作成 → 開発 → PR → マージ
- C) develop → release → main
- D) ブランチ作成 → main削除 → 完了

<details>
<summary>回答と解説</summary>

**正解: B**

GitHub Flowは、mainからブランチを作成し、開発後にPull Requestを作成してレビューを受け、mainにマージするシンプルなフローです。

</details>

---

### 【マージとコンフリクト】

#### Q10. コンフリクトが発生するのはどんな場合ですか？

- A) ファイルを新規作成したとき
- B) 同じファイルの同じ箇所を別々に編集したとき
- C) コミットメッセージを書き忘れたとき
- D) ブランチを削除したとき

<details>
<summary>回答と解説</summary>

**正解: B**

コンフリクトは、複数のブランチで同じファイルの同じ箇所を編集し、Gitが自動的にマージできない場合に発生します。

</details>

---

#### Q11. コンフリクト解決後にすべきことはどれですか？

- A) `git push`のみ
- B) `git add` → `git commit`
- C) `git reset`
- D) 何もしなくてよい

<details>
<summary>回答と解説</summary>

**正解: B**

コンフリクトを解決したら、変更をステージング（`git add`）し、コミット（`git commit`）する必要があります。

</details>

---

### 【GitHub】

#### Q12. Pull Requestの主な目的として最も適切なものはどれですか？

- A) ファイルをダウンロードする
- B) コードレビューを受けてからマージする
- C) リポジトリを削除する
- D) ユーザーを招待する

<details>
<summary>回答と解説</summary>

**正解: B**

Pull Requestは、変更をレビューしてもらい、承認後にメインブランチにマージするための機能です。

</details>

---

#### Q13. PRの説明文に「Closes #123」と書くとどうなりますか？

- A) Issue #123が削除される
- B) PRがマージされるとIssue #123が自動的にクローズされる
- C) Issue #123にコメントが追加される
- D) 何も起きない

<details>
<summary>回答と解説</summary>

**正解: B**

「Closes #123」や「Fixes #123」をPRの説明に含めると、PRがマージされたときに関連するIssueが自動的にクローズされます。

</details>

---

#### Q14. 良いPRの特徴として適切でないものはどれですか？

- A) 変更内容が明確に説明されている
- B) 変更が小さくレビューしやすい
- C) できるだけ多くの変更を1つのPRに含める
- D) 確認方法が記載されている

<details>
<summary>回答と解説</summary>

**正解: C**

良いPRは小さく、レビューしやすいことが重要です。大きなPRはレビューが難しく、問題を見逃しやすくなります。

</details>

---

#### Q15. `git push -u origin feature/login`の`-u`オプションの意味は何ですか？

- A) 強制プッシュ
- B) 上流ブランチを設定する
- C) 全ブランチをプッシュ
- D) 確認なしでプッシュ

<details>
<summary>回答と解説</summary>

**正解: B**

`-u`（`--set-upstream`）は、ローカルブランチとリモートブランチの関連付けを設定します。次回から`git push`だけで同じリモートブランチにプッシュできます。

</details>

---

## 📊 結果

| 正解数 | 判定 | アドバイス |
|:------:|:----:|-----------|
| 12-15問 | ✅ 合格 | 次のカテゴリに進んでください |
| 9-11問 | ⚠️ 惜しい | 間違えた箇所を復習してください |
| 8問以下 | ❌ 要復習 | コンテンツを読み直してください |

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../docs/terms-of-use.md)をご覧ください。
