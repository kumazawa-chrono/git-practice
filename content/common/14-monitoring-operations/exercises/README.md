# 14. 監視と運用 - 実践課題

## 📋 概要

このカテゴリでは、Prometheus + Grafana + Lokiを使った監視基盤の構築と、実際の運用で必要なアラート設計・インシデント対応を学びます。

> 💡 **費用について**: すべての課題はオープンソースツール（Prometheus, Grafana, Loki）を使用するため、**無料**で学習できます。

## 🎯 学習目標

- [ ] Prometheus + Grafanaで監視環境を構築できる
- [ ] アプリケーションにメトリクスを実装できる
- [ ] 効果的なダッシュボードを作成できる
- [ ] アラートルールを設計・実装できる
- [ ] インシデント対応の流れを理解する

## 📝 課題一覧

| 課題 | 難易度 | 所要時間 | 内容 |
|------|:------:|:--------:|------|
| [課題1](exercise-01.md) | ⭐ | 45分 | 監視基盤の構築 |
| [課題2](exercise-02.md) | ⭐⭐ | 60分 | アプリケーションメトリクス |
| [課題3](exercise-03.md) | ⭐⭐⭐ | 90分 | アラートとインシデント対応 |

## 🔧 事前準備

### 必要なツール

```bash
# Docker / Docker Compose
docker --version
docker compose version
```

### 基本的な監視スタック

```yaml
# docker-compose.yml（課題で使用）
services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus:/etc/prometheus

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin

  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"

  promtail:
    image: grafana/promtail:latest
    volumes:
      - /var/log:/var/log
      - ./promtail:/etc/promtail
```

## 📁 提出方法

1. 各課題の設定ファイルを作成
2. ダッシュボードのJSONエクスポートを含める
3. PRを作成して提出

```
exercises/
├── exercise-01/
│   ├── docker-compose.yml
│   ├── prometheus/
│   └── grafana/
├── exercise-02/
│   ├── app/
│   └── dashboards/
└── exercise-03/
    ├── alerts/
    ├── runbooks/
    └── postmortem-template.md
```

## 🔗 参考

- [監視の基本概念](../14-monitoring-operations-01.md)
- [メトリクス監視](../14-monitoring-operations-03.md)

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../../docs/terms-of-use.md)をご覧ください。
