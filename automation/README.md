# 自動化スクリプト

メンターの負荷を減らすための自動化スクリプト集です。

> ✅ **実装状況**: 全ての自動化機能が実装済みです。詳細は[実装状況](../docs/implementation-status.md)を参照してください。

## ディレクトリ構成

```
automation/
├── certificate-generator/    # 修了証生成システム
├── feedback-generators/       # フィードバック生成スクリプト
├── review-scripts/           # 自動レビュースクリプト
└── test-runners/             # テストランナー
```

## 使用方法

### フィードバック生成

```bash
# 課題ディレクトリのコードをレビューしてフィードバックを生成
node automation/feedback-generators/index.js exercises/common/01-git-basics
```

### テスト実行

```bash
# 単一の課題のテストを実行
node automation/test-runners/exercise-test-runner.js exercises/common/01-git-basics

# 複数の課題のテストを一括実行
node automation/test-runners/exercise-test-runner.js exercises/common/01-git-basics exercises/common/02-programming-fundamentals
```

### 自動レビュー

```bash
# 変更されたファイルを自動レビュー
node automation/review-scripts/auto-review.js exercises/common/01-git-basics/index.ts
```

## GitHub Actions ワークフロー

`.github/workflows/` ディレクトリに以下のワークフローが実装されています：

### 基本ワークフロー

- `exercise-check.yml` - PR作成時にテスト、Lint、型チェックを自動実行
- `auto-label.yml` - PRに自動でラベルを付与
- `auto-feedback.yml` - テスト失敗時に自動フィードバックをコメント
- `auto-assign.yml` - CODEOWNERSからレビュアーを自動アサイン
- `progress-update.yml` - PRマージ時に進捗ファイルを自動更新

### 定期実行ワークフロー

- `weekly-report.yml` - 毎週月曜に進捗レポートを自動生成
- `motivation-monitor.yml` - 毎日9:00 JSTにモチベーション・進捗アラートを自動検出
- `mentor-daily-checklist.yml` - 毎日9:00 JSTにメンターデイリーチェックリストを自動生成

## 関連ドキュメント

- [レビュー自動化設計](../docs/review-automation.md)
- [メンター用運用ガイド](https://github.com/honeycome-bootcamp/bootcamp-v2-mentor/blob/main/docs/mentor-guide.md)（メンター専用リポジトリ）
