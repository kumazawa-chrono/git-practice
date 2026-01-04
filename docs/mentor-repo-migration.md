# メンター専用リポジトリへの移行手順

このドキュメントは、メンター向けドキュメントと料金関係のドキュメントを別リポジトリで管理するための移行手順です。

## 📋 対象ファイル

以下のファイルを別リポジトリに移動します：

### メンター向けドキュメント
- `docs/mentor-guide.md`
- `docs/mentor-quick-start.md`

### 料金関係のドキュメント
- `materials/pricing-sheet.md`
- `materials/promotional-material.md`
- `docs/tools-and-costs.md`

## 🚀 移行手順

### Step 1: 新しいプライベートリポジトリを作成

1. GitHubで新しいプライベートリポジトリを作成
   - リポジトリ名: `bootcamp-v2-mentor`（推奨）
   - 可視性: **Private**（重要）
   - 説明: "メンター専用ドキュメントと料金関係資料"

2. アクセス権限を設定
   - メンターチーム（`@honeycome/mentors`）に読み書き権限を付与
   - 管理者チーム（`@honeycome/admins`）に読み書き権限を付与
   - 研修生にはアクセス権限を付与しない

### Step 2: セットアップスクリプトを実行

```bash
# スクリプトに実行権限を付与
chmod +x .github/scripts/setup-mentor-repo.sh

# スクリプトを実行（デフォルト設定）
./.github/scripts/setup-mentor-repo.sh

# または、カスタムリポジトリ名とパスを指定
./.github/scripts/setup-mentor-repo.sh bootcamp-v2-mentor ../bootcamp-v2-mentor
```

### Step 3: 新しいリポジトリにファイルをコミット・プッシュ

```bash
cd ../bootcamp-v2-mentor  # または指定したパス

# リモートリポジトリを追加
git remote add origin https://github.com/honeycome-bootcamp/bootcamp-v2-mentor.git

# ファイルをコミット
git add .
git commit -m "Initial commit: メンター専用ドキュメントと料金関係資料"

# プッシュ
git push -u origin main
```

### Step 4: 元のリポジトリの参照を更新

元のリポジトリ（`bootcamp-v2`）で、これらのファイルへの参照を別リポジトリへのリンクに更新します。

#### 4.1 README.mdの更新

`README.md`のメンター向けセクションを更新：

```markdown
## メンター向け

1. [メンター専用リポジトリ](https://github.com/honeycome-bootcamp/bootcamp-v2-mentor)にアクセス
2. [メンター向けクイックスタート](https://github.com/honeycome-bootcamp/bootcamp-v2-mentor/blob/main/docs/mentor-quick-start.md)を読む（**最初に読む**）
3. [メンター用運用ガイド](https://github.com/honeycome-bootcamp/bootcamp-v2-mentor/blob/main/docs/mentor-guide.md)で詳細を確認する
4. デイリーチェックリストに従って作業を進める
```

#### 4.2 その他のドキュメントの更新

以下のファイルで、メンター専用ドキュメントへの参照を更新：

- `docs/automation-summary.md`
- `docs/platform-comparison.md`
- `docs/curriculum-overview.md`
- `docs/review-automation.md`
- `docs/requirements.md`
- `automation/README.md`

**更新例**:
```markdown
# 変更前
- [メンター用運用ガイド](mentor-guide.md)

# 変更後
- [メンター用運用ガイド](https://github.com/honeycome-bootcamp/bootcamp-v2-mentor/blob/main/docs/mentor-guide.md)（メンター専用リポジトリ）
```

### Step 5: 元のリポジトリからファイルを削除（オプション）

別リポジトリへの移行が完了し、すべての参照を更新したら、元のリポジトリからファイルを削除できます。

**注意**: 既に`.gitignore`に追加されているため、これらのファイルはGitで追跡されていません。ローカルファイルを削除する場合は：

```bash
# ローカルファイルを削除（必要に応じて）
rm docs/mentor-guide.md
rm docs/mentor-quick-start.md
rm materials/pricing-sheet.md
rm materials/promotional-material.md
rm docs/tools-and-costs.md
```

## ✅ 移行完了後の確認事項

- [ ] 新しいプライベートリポジトリが作成されている
- [ ] メンターチームにアクセス権限が付与されている
- [ ] すべてのファイルが新しいリポジトリにコピーされている
- [ ] 元のリポジトリの参照が更新されている
- [ ] `.gitignore`にファイルが追加されている（既に完了）
- [ ] 研修生向けドキュメントから参照が削除されている（既に完了）

## 🔄 今後の運用

### ドキュメントの更新

メンター専用ドキュメントを更新する場合は、**新しいリポジトリ**で作業してください：

```bash
cd ../bootcamp-v2-mentor
# ファイルを編集
git add .
git commit -m "Update: メンターガイドを更新"
git push
```

### 新しいメンターのオンボーディング

新しいメンターには、以下の情報を提供：

1. メンター専用リポジトリへのアクセス権限を付与
2. リポジトリをクローン:
   ```bash
   git clone https://github.com/honeycome-bootcamp/bootcamp-v2-mentor.git
   ```
3. [メンター向けクイックスタート](https://github.com/honeycome-bootcamp/bootcamp-v2-mentor/blob/main/docs/mentor-quick-start.md)を読むよう案内

## 🔗 関連ドキュメント

- [メインリポジトリ](https://github.com/honeycome-bootcamp/bootcamp-v2)
- [メンター専用リポジトリ](https://github.com/honeycome-bootcamp/bootcamp-v2-mentor)（移行後）

---

**最終更新**: 移行手順作成時
