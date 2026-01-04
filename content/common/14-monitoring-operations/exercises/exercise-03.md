# 課題3: アラートとインシデント対応

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐⭐⭐ |
| 所要時間 | 90分 |
| 前提知識 | アプリケーションメトリクス |

## 🎯 目標

効果的なアラートルールを設計し、インシデント対応の流れを実践する。

## 📝 課題内容

### Step 1: アラートルールの設計

以下のアラートルールを設計してください。

| アラート名 | 条件 | 重要度 | 説明 |
|-----------|------|:------:|------|
| HighErrorRate | エラー率 > 5%（5分間） | critical | サービス品質に影響 |
| HighLatency | p95 > 1秒（5分間） | warning | パフォーマンス低下 |
| ServiceDown | upが0（1分間） | critical | サービス停止 |
| HighMemoryUsage | メモリ > 80% | warning | リソース枯渇の予兆 |
| HighCpuUsage | CPU > 80%（5分間） | warning | リソース枯渇の予兆 |

### Step 2: Prometheusアラートルール

**prometheus/alerts.yml**:
```yaml
groups:
  - name: app
    rules:
      # 高エラー率
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{status=~"5.."}[5m])) 
          / sum(rate(http_requests_total[5m])) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "エラー率が5%を超えています"
          description: "現在のエラー率: {{ $value | printf \"%.2f\" }}%"
          runbook: "https://wiki.example.com/runbooks/high-error-rate"

      # 高レイテンシー - 実装してください
      - alert: HighLatency
        # expr: ...

      # サービスダウン - 実装してください
      - alert: ServiceDown
        # expr: ...

  - name: infrastructure
    rules:
      # 高メモリ使用率 - 実装してください
      - alert: HighMemoryUsage
        # expr: ...

      # 高CPU使用率 - 実装してください
      - alert: HighCpuUsage
        # expr: ...
```

**prometheus/prometheus.yml**に追加:
```yaml
rule_files:
  - alerts.yml
```

### Step 3: Alertmanagerの設定

**alertmanager/alertmanager.yml**:
```yaml
global:
  resolve_timeout: 5m

route:
  receiver: 'default'
  group_by: ['alertname', 'severity']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  
  routes:
    - match:
        severity: critical
      receiver: 'critical'
    - match:
        severity: warning
      receiver: 'warning'

receivers:
  - name: 'default'
    webhook_configs:
      - url: 'http://webhook:5000/webhook'
        send_resolved: true

  - name: 'critical'
    webhook_configs:
      - url: 'http://webhook:5000/webhook/critical'
        send_resolved: true

  - name: 'warning'
    webhook_configs:
      - url: 'http://webhook:5000/webhook/warning'
        send_resolved: true

inhibit_rules:
  - source_match:
      severity: 'critical'
    target_match:
      severity: 'warning'
    equal: ['alertname']
```

### Step 4: Webhook受信サーバー（通知のシミュレーション）

**webhook/app.py**:
```python
from flask import Flask, request, jsonify
from datetime import datetime
import json

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    data = request.json
    print(f"\n{'='*50}")
    print(f"[{datetime.now()}] Alert received!")
    print(json.dumps(data, indent=2))
    print(f"{'='*50}\n")
    return jsonify({"status": "ok"})

@app.route('/webhook/critical', methods=['POST'])
def webhook_critical():
    data = request.json
    print(f"\n{'!'*50}")
    print(f"[{datetime.now()}] 🚨 CRITICAL ALERT!")
    for alert in data.get('alerts', []):
        print(f"  - {alert['labels']['alertname']}: {alert['annotations'].get('summary', 'No summary')}")
    print(f"{'!'*50}\n")
    return jsonify({"status": "ok"})

@app.route('/webhook/warning', methods=['POST'])
def webhook_warning():
    data = request.json
    print(f"\n{'*'*50}")
    print(f"[{datetime.now()}] ⚠️ WARNING ALERT!")
    for alert in data.get('alerts', []):
        print(f"  - {alert['labels']['alertname']}: {alert['annotations'].get('summary', 'No summary')}")
    print(f"{'*'*50}\n")
    return jsonify({"status": "ok"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

### Step 5: docker-compose.ymlの更新

Alertmanagerとwebhookサーバーを追加:

```yaml
services:
  # ... 既存のサービス ...

  alertmanager:
    image: prom/alertmanager:latest
    ports:
      - "9093:9093"
    volumes:
      - ./alertmanager:/etc/alertmanager
    command:
      - '--config.file=/etc/alertmanager/alertmanager.yml'

  webhook:
    build: ./webhook
    ports:
      - "5000:5000"
```

### Step 6: ランブックの作成

**runbooks/high-error-rate.md**:
```markdown
# HighErrorRate アラート対応ランブック

## 概要
エラー率が5%を超えた場合に発報されるアラートです。

## 影響
- ユーザーリクエストの一部が失敗
- サービス品質の低下

## 確認手順

### 1. エラーの内訳を確認
```promql
sum(rate(http_requests_total{status=~"5.."}[5m])) by (path, status)
```

### 2. ログを確認
```
{app="myapp"} |= "error"
```

### 3. 最近のデプロイを確認
- GitHub: 最近のマージ
- CI/CD: 最近のデプロイ

## 対応手順

### 特定のエンドポイントでエラーが多い場合
1. 該当エンドポイントのコードを確認
2. 依存サービスの状態を確認
3. 必要に応じて該当機能を無効化

### 全体的にエラーが増加している場合
1. 最新デプロイをロールバック
   ```bash
   kubectl rollout undo deployment/myapp
   ```
2. 外部サービスの状態を確認
3. インフラの状態を確認

## エスカレーション
- 30分で解決しない場合: @tech-lead
- サービス全体に影響: @manager

## 関連リンク
- [Grafanaダッシュボード](http://grafana:3000/d/xxx)
- [ログ検索](http://grafana:3000/explore)
```

**他のアラート用のランブックも作成してください**:
- `runbooks/high-latency.md`
- `runbooks/service-down.md`
- `runbooks/high-memory-usage.md`

### Step 7: ポストモーテムテンプレート

**postmortem-template.md**:
```markdown
# インシデントポストモーテム

## 基本情報
- **日時**: YYYY-MM-DD HH:MM - HH:MM JST
- **影響**: 
- **影響を受けたユーザー数**: 
- **重要度**: Critical / Warning
- **対応者**: 

## タイムライン
| 時刻 | イベント |
|------|---------|
| HH:MM | |
| HH:MM | |

## 根本原因


## 影響範囲


## 対応内容


## 再発防止策
| アクション | 担当 | 期限 | ステータス |
|-----------|------|------|-----------|
| | | | |

## 学んだこと


## 参考情報
- 関連Issue: 
- 関連PR: 
```

### Step 8: アラートのテスト

```bash
# 起動
docker compose up -d

# エラーを発生させる
for i in {1..1000}; do
  curl -s http://localhost:3000/error > /dev/null &
done

# Alertmanagerを確認
# http://localhost:9093

# webhookサーバーのログを確認
docker compose logs -f webhook

# アラートが発報されることを確認
```

## ✅ 完了条件

- [ ] 5つのアラートルールが実装されている
- [ ] Alertmanagerが正しく設定されている
- [ ] アラート発報時にwebhookが呼ばれる
- [ ] 4つ以上のランブックが作成されている
- [ ] ポストモーテムテンプレートが作成されている
- [ ] 実際にアラートを発報させてテストしている

## 📊 評価ポイント

| 項目 | 配点 |
|------|:----:|
| アラートルール設計 | 30% |
| Alertmanager設定 | 20% |
| ランブック | 30% |
| テスト | 20% |

## 💡 ヒント

<details>
<summary>p95のアラート条件</summary>

```yaml
expr: |
  histogram_quantile(0.95, 
    sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
  ) > 1
```

</details>

<details>
<summary>メモリ使用率の計算</summary>

```yaml
expr: |
  (1 - node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes) * 100 > 80
```

</details>

## 📤 提出物

- `exercise-03/prometheus/alerts.yml`
- `exercise-03/alertmanager/alertmanager.yml`
- `exercise-03/docker-compose.yml`
- `exercise-03/runbooks/` 以下のランブック（4つ以上）
- `exercise-03/postmortem-template.md`
- アラート発報のスクリーンショット

## 🔗 参考

- [アラートとインシデント対応](../14-monitoring-operations-04.md)
