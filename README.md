# Honeycome エンジニア研修 Bootcamp v2

## 概要

本リポジトリは、Honeycome社のエンジニア研修用コンテンツを管理するリポジトリです。

**「AI駆動開発全盛の時代でも、基礎力と正しい開発フローを身につけたエンジニアを育成する」**

## 研修の目的

AIコーディング支援ツール（Cursor、GitHub Copilot、ChatGPT等）が普及する中、以下の能力が重要になっています：

1. **AIの間違いを見抜く力** - 基礎知識がないと、AIの出力が正しいか判断できない
2. **開発の正しいフローを知る** - AIに振り回されず、目的を持ってAIを活用できる
3. **しっかりとした土台を作る** - 一度は自分の手を動かして作る経験

## コース

| コース | 対象 | 期間 |
|--------|------|------|
| Webエンジニアコース | Web開発を学びたい方 | 1-1.5ヶ月 |
| iOS/Androidアプリエンジニアコース | モバイルアプリ開発を学びたい方 | 1-1.5ヶ月（Webコース後は0.5-1ヶ月） |
| IoTエンジニアコース | IoT開発を学びたい方 | 1-1.5ヶ月 |

## リポジトリ構成

```
bootcamp-v2/
├── docs/                    # ドキュメント
├── content/                 # 学習コンテンツ
│   ├── common/              # 共通基礎（全コース共通）✅ 完成
│   ├── web/                 # Webエンジニアコース ✅ 完成
│   ├── mobile/              # iOS/Androidアプリエンジニアコース ✅ 完成
│   └── iot/                 # IoTエンジニアコース ✅ 完成
├── exercises/               # 実践課題 ✅ 構造完成
│   ├── common/              # 共通基礎の実践課題
│   ├── web/                 # Webコースの実践課題
│   ├── mobile/              # モバイルコースの実践課題
│   └── iot/                 # IoTコースの実践課題
├── tests/                   # 理解度チェックテスト ✅ 基盤完成
│   ├── common/              # 共通基礎のテスト（一部自動採点版あり）
│   ├── web/                 # Webコースのテスト
│   ├── mobile/              # モバイルコースのテスト
│   └── iot/                 # IoTコースのテスト
├── automation/              # レビュー自動化 ✅ 実装完了
│   ├── certificate-generator/  # 修了証生成
│   ├── feedback-generators/   # フィードバック生成
│   ├── review-scripts/        # 自動レビュー
│   └── test-runners/          # テストランナー
├── .github/workflows/       # GitHub Actions ✅ 実装完了
│   ├── exercise-check.yml   # テスト・Lint自動実行
│   ├── auto-label.yml       # 自動ラベル付与
│   ├── auto-feedback.yml    # 自動フィードバック
│   ├── auto-assign.yml      # レビュアー自動アサイン
│   ├── progress-update.yml  # 進捗自動更新
│   ├── weekly-report.yml    # 週次レポート
│   ├── motivation-monitor.yml  # モチベーション監視
│   └── mentor-daily-checklist.yml  # メンターチェックリスト
├── progress/                # 進捗管理
│   └── templates/           # 進捗テンプレート
└── templates/               # テンプレート
```

## 始め方

### 研修生向け

> ⛔ **研修生の禁止事項**: **main に直接 push しない**・**自分で PR をマージしない**。課題・進捗は必ず別ブランチで PR 提出し、マージはメンターが行います。詳しくは [提出ガイド](docs/submission-guide.md#-必ず守ってください禁止事項) を参照してください。

1. [研修生向けクイックスタート](docs/student-quick-start.md)を読む（**最初に読む**）
2. [研修生向けガイド](docs/student-guide.md)で詳細を確認する
3. **[進捗・実践課題の提出ガイド](docs/submission-guide.md)** で提出方法を確認する（進捗の記録・提出と実践課題のPR提出の手順を解説）
4. [カリキュラム概要](docs/curriculum-overview.md)で全体像を把握する
5. 共通基礎から学習を開始する

> 💡 **経験のあるエンジニアの方へ**: AI駆動開発を許可される前に、[経験エンジニア向け AI駆動開発前提条件コース](docs/experienced-engineer-prerequisites.md)を完了してください。

## メンター向け

> 📌 **重要**: メンター向けドキュメントと料金関係の資料は、別のプライベートリポジトリで管理されています。
> 詳細は[移行手順](docs/mentor-repo-migration.md)を参照してください。

1. [メンター専用リポジトリ](https://github.com/honeycome-bootcamp/bootcamp-v2-mentor)にアクセス（メンターのみ）
2. [メンター向けクイックスタート](https://github.com/honeycome-bootcamp/bootcamp-v2-mentor/blob/main/docs/mentor-quick-start.md)を読む（**最初に読む**）
3. [メンター用運用ガイド](https://github.com/honeycome-bootcamp/bootcamp-v2-mentor/blob/main/docs/mentor-guide.md)で詳細を確認する
4. デイリーチェックリストに従って作業を進める

## ドキュメント

- [要件定義書](docs/requirements.md)
- [研修生向けガイド](docs/student-guide.md)
- [カリキュラム概要](docs/curriculum-overview.md)
- [実装状況](docs/implementation-status.md) - 実装状況の詳細
- [自動化システムサマリー](docs/automation-summary.md) - 自動化機能の概要
- [v1からの差分学習ガイド](docs/migration-guide-v1-to-v2.md) - 旧コンテンツ受講者向け
- [レビュー自動化設計](docs/review-automation.md)
- [プラットフォーム選択の比較](docs/platform-comparison.md)
- [メンター専用リポジトリ移行手順](docs/mentor-repo-migration.md)
- [経験エンジニア向け AI駆動開発前提条件コース](docs/experienced-engineer-prerequisites.md) - 経験エンジニア向け
- [コンテンツ改善ガイド](docs/contributing.md)

> 📌 **メンター向けドキュメント**: [メンター専用リポジトリ](https://github.com/honeycome-bootcamp/bootcamp-v2-mentor)で管理されています（メンターのみアクセス可能）

## コンテンツの改善

研修コンテンツの品質向上のため、フィードバックを歓迎します。

- 📝 [誤りの報告](../../issues/new?template=content-error.yml)
- 💡 [改善提案](../../issues/new?template=content-improvement.yml)
- 🔧 直接PRを作成（[ガイド](docs/contributing.md)参照）

## 技術スタック

- **共通**: TypeScript
- **Web**: React/Next.js, Node.js, Express/Fastify
- **モバイル**: Swift (iOS), Kotlin (Android), React Native
- **IoT**: C/C++ (組み込み), TypeScript/Node.js (高レベル制御)

## ライセンス

Copyright © Honeycome Inc. All rights reserved.
