# 11. コンテナ発展 - 実践課題

## 📋 概要

このカテゴリでは、Docker Composeを使ったマルチコンテナアプリケーションの構築と、本番運用を意識したコンテナ設計を学びます。

## 🎯 学習目標

- [ ] Docker Composeでマルチコンテナ環境を構築できる
- [ ] サービス間の依存関係を適切に設定できる
- [ ] 本番運用を意識したDockerfileを作成できる
- [ ] ヘルスチェックとログ設定を実装できる

## 📝 課題一覧

| 課題 | 難易度 | 所要時間 | 内容 |
|------|:------:|:--------:|------|
| [課題1](exercise-01.md) | ⭐ | 30分 | Docker Compose基礎 |
| [課題2](exercise-02.md) | ⭐⭐ | 60分 | マルチコンテナWebアプリ |
| [課題3](exercise-03.md) | ⭐⭐⭐ | 90分 | 本番運用を意識した構成 |

## 🔧 事前準備

```bash
# Docker / Docker Composeがインストールされていることを確認
docker --version
docker compose version

# 作業ディレクトリを作成
mkdir -p ~/bootcamp/11-container-advanced
cd ~/bootcamp/11-container-advanced
```

## 📁 提出方法

1. 各課題のディレクトリを作成
2. 必要なファイルを配置
3. PRを作成して提出

```
exercises/
├── exercise-01/
│   └── compose.yaml
├── exercise-02/
│   ├── compose.yaml
│   ├── backend/
│   │   └── Dockerfile
│   └── frontend/
│       └── Dockerfile
└── exercise-03/
    ├── compose.yaml
    ├── compose.prod.yaml
    └── ...
```

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../../docs/terms-of-use.md)をご覧ください。
