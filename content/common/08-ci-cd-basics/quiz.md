# 08. CI/CD基礎 - 理解度チェックテスト

## 📋 テストについて

| 項目 | 内容 |
|------|------|
| 問題数 | 15問 |
| 目安時間 | 15分 |
| 合格ライン | 12問以上正解（80%） |

---

## 問題

### 【CI/CD概念】

#### Q1. CIの主な目的は何ですか？

- A) 本番環境にデプロイする
- B) コードを頻繁に統合し、自動テストで品質を確認する
- C) ドキュメントを生成する
- D) コードレビューを行う

<details>
<summary>回答と解説</summary>

**正解: B**

CI（継続的インテグレーション）は、コードを頻繁に統合し、自動ビルド・テストで品質を確認することが目的です。

</details>

---

#### Q2. 継続的デリバリーと継続的デプロイメントの違いは何ですか？

- A) 同じもの
- B) デリバリーは手動承認後にデプロイ、デプロイメントは全自動
- C) デプロイメントはテストを行わない
- D) デリバリーはステージング環境のみ

<details>
<summary>回答と解説</summary>

**正解: B**

継続的デリバリーは本番デプロイ可能な状態を維持（手動承認後にデプロイ）、継続的デプロイメントはテスト通過後に自動で本番デプロイします。

</details>

---

### 【GitHub Actions】

#### Q3. GitHub Actionsのワークフローファイルを置く場所はどこですか？

- A) プロジェクトルート
- B) `.github/workflows/`
- C) `.actions/`
- D) `workflows/`

<details>
<summary>回答と解説</summary>

**正解: B**

GitHub Actionsのワークフローファイル（YAML）は`.github/workflows/`ディレクトリに配置します。

</details>

---

#### Q4. `on: [push, pull_request]`の意味は何ですか？

- A) プッシュまたはPR時にワークフローを実行
- B) プッシュとPRを同時に行う
- C) プッシュ後にPRを作成
- D) プッシュを無効化

<details>
<summary>回答と解説</summary>

**正解: A**

`on`はトリガーを定義し、`[push, pull_request]`はプッシュ時またはPR時にワークフローを実行します。

</details>

---

#### Q5. `runs-on: ubuntu-latest`の意味は何ですか？

- A) Ubuntuにデプロイする
- B) 最新のUbuntu上でジョブを実行する
- C) Ubuntuユーザーのみ実行可能
- D) Ubuntuのみをサポート

<details>
<summary>回答と解説</summary>

**正解: B**

`runs-on`はジョブを実行する環境（ランナー）を指定します。`ubuntu-latest`は最新のUbuntu環境です。

</details>

---

#### Q6. `uses: actions/checkout@v4`の役割は何ですか？

- A) ログアウトする
- B) リポジトリのコードをチェックアウトする
- C) PRをチェックアウトする
- D) イシューを作成する

<details>
<summary>回答と解説</summary>

**正解: B**

`actions/checkout`はリポジトリのコードをワークフロー環境にチェックアウト（クローン）します。

</details>

---

#### Q7. シークレット値の参照方法として正しいものはどれですか？

- A) `$SECRET_KEY`
- B) `${{ secrets.SECRET_KEY }}`
- C) `secrets.SECRET_KEY`
- D) `env.SECRET_KEY`

<details>
<summary>回答と解説</summary>

**正解: B**

シークレットは`${{ secrets.シークレット名 }}`の形式で参照します。

</details>

---

#### Q8. `needs: build`の意味は何ですか？

- A) buildジョブをスキップ
- B) buildジョブが必要（完了後に実行）
- C) buildジョブを削除
- D) buildジョブと並列実行

<details>
<summary>回答と解説</summary>

**正解: B**

`needs`は依存するジョブを指定します。指定したジョブが成功した後に実行されます。

</details>

---

#### Q9. マトリックスビルドの目的は何ですか？

- A) ビルドを高速化
- B) 複数の環境・バージョンで並列テスト
- C) ビルドを暗号化
- D) ビルドログを整理

<details>
<summary>回答と解説</summary>

**正解: B**

マトリックスビルドは、複数のNode.jsバージョンやOSなど、異なる環境で並列にテストを実行できます。

</details>

---

#### Q10. `if: github.ref == 'refs/heads/main'`の意味は何ですか？

- A) mainブランチを作成
- B) mainブランチの場合のみ実行
- C) mainブランチを削除
- D) mainブランチにマージ

<details>
<summary>回答と解説</summary>

**正解: B**

`if`は条件を指定し、`github.ref == 'refs/heads/main'`はmainブランチの場合のみ実行します。

</details>

---

### 【実践】

#### Q11. キャッシュを使う主な目的は何ですか？

- A) セキュリティ向上
- B) 依存関係のインストール時間を短縮
- C) コードを暗号化
- D) ログを保存

<details>
<summary>回答と解説</summary>

**正解: B**

キャッシュは、`node_modules`などの依存関係を保存して、次回のビルド時のインストール時間を短縮します。

</details>

---

#### Q12. ブランチ保護ルールで「Require status checks」を設定する目的は何ですか？

- A) ブランチを削除できなくする
- B) テストが通らないとマージできなくする
- C) プッシュを禁止する
- D) コメントを必須にする

<details>
<summary>回答と解説</summary>

**正解: B**

「Require status checks」は、指定したCIジョブ（テストなど）が成功しないとマージできないようにします。

</details>

---

#### Q13. `actions/upload-artifact`の用途は何ですか？

- A) ファイルを削除する
- B) ビルド成果物を保存して後続ジョブで使う
- C) ファイルを暗号化する
- D) ファイルを外部に送信する

<details>
<summary>回答と解説</summary>

**正解: B**

`upload-artifact`はビルド成果物を保存し、後続のジョブや手動ダウンロードで使用できるようにします。

</details>

---

#### Q14. PRに対してのみワークフローを実行する設定はどれですか？

- A) `on: push`
- B) `on: pull_request`
- C) `on: merge`
- D) `on: commit`

<details>
<summary>回答と解説</summary>

**正解: B**

`on: pull_request`はPR作成・更新時にワークフローを実行します。

</details>

---

#### Q15. CI/CDのパイプラインで一般的な順序はどれですか？

- A) デプロイ → テスト → ビルド
- B) テスト → デプロイ → ビルド
- C) ビルド → テスト → デプロイ
- D) テスト → ビルド → デプロイ

<details>
<summary>回答と解説</summary>

**正解: D または C**

一般的には「テスト → ビルド → デプロイ」または「ビルド → テスト → デプロイ」の順序です。テストを先に行い、品質を確認してからデプロイします。

</details>

---

## 📊 結果

| 正解数 | 判定 | アドバイス |
|:------:|:----:|-----------|
| 12-15問 | ✅ 合格 | 次のカテゴリに進んでください |
| 9-11問 | ⚠️ 惜しい | 間違えた箇所を復習してください |
| 8問以下 | ❌ 要復習 | コンテンツを読み直してください |
