# 課題2: ECS/Fargateローカル実行

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐⭐ |
| 所要時間 | 60分 |
| 前提知識 | Docker Compose、VPC設計 |
| 環境 | Docker（ローカル） |

## 🎯 目標

ECS/Fargateにデプロイする前に、ローカルでECS互換の構成を検証する。

## 📝 課題内容

### 背景

ECS/Fargateにデプロイする前に、ローカルで動作を確認することで：
- デプロイサイクルを短縮
- AWSコストを削減
- デバッグを容易に

### Step 1: アプリケーションの準備

シンプルなNode.jsアプリケーションを作成:

**app/package.json**:
```json
{
  "name": "ecs-app",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

**app/src/index.js**:
```javascript
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// ヘルスチェックエンドポイント
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    hostname: process.env.HOSTNAME || 'unknown',
  });
});

// メインエンドポイント
app.get('/', (req, res) => {
  res.json({
    message: 'Hello from ECS!',
    container: process.env.HOSTNAME || 'unknown',
    environment: process.env.NODE_ENV || 'development',
  });
});

// メトリクス（Prometheus形式）
app.get('/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(`
# HELP http_requests_total Total HTTP requests
# TYPE http_requests_total counter
http_requests_total{method="GET",path="/"} 100
http_requests_total{method="GET",path="/health"} 500
`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

### Step 2: 本番用Dockerfileの作成

ECS/Fargateで動作する本番用Dockerfileを作成:

**app/Dockerfile**:
```dockerfile
# ビルドステージ
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# 実行ステージ
FROM node:18-alpine
WORKDIR /app

# 非rootユーザー
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

# ファイルコピー
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --chown=nodejs:nodejs src ./src
COPY --chown=nodejs:nodejs package.json ./

# 環境変数
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# ヘルスチェック
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "src/index.js"]
```

### Step 3: ECS互換のDocker Compose

ALB + 複数タスクの構成をローカルで再現:

**docker-compose.yml**:
```yaml
services:
  # ALBの代わりにNginx
  loadbalancer:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - app1
      - app2
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://localhost/health"]
      interval: 10s
      timeout: 5s
      retries: 3

  # ECSタスク1
  app1:
    build:
      context: ./app
      dockerfile: Dockerfile
    environment:
      - NODE_ENV=production
      - HOSTNAME=task-1
    expose:
      - "3000"
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://localhost:3000/health"]
      interval: 30s
      timeout: 3s
      retries: 3

  # ECSタスク2
  app2:
    build:
      context: ./app
      dockerfile: Dockerfile
    environment:
      - NODE_ENV=production
      - HOSTNAME=task-2
    expose:
      - "3000"
    healthcheck:
      test: ["CMD", "wget", "-q", "--spider", "http://localhost:3000/health"]
      interval: 30s
      timeout: 3s
      retries: 3

  # CloudWatch Logsの代わりにLoki
  loki:
    image: grafana/loki:2.9.0
    ports:
      - "3100:3100"

  # Grafana
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
    volumes:
      - grafana-data:/var/lib/grafana

volumes:
  grafana-data:
```

**nginx.conf**:
```nginx
events {
    worker_connections 1024;
}

http {
    upstream app {
        server app1:3000;
        server app2:3000;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://app;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        location /health {
            proxy_pass http://app;
        }
    }
}
```

### Step 4: 動作確認

```bash
# 起動
docker compose up -d --build

# ヘルスチェック
docker compose ps

# 負荷分散の確認（複数回実行してcontainerが変わることを確認）
for i in {1..10}; do
  curl -s http://localhost/ | jq -r .container
done

# ログ確認
docker compose logs -f app1 app2

# スケール
docker compose up -d --scale app1=3 --scale app2=0
```

### Step 5: タスク定義のドキュメント化

ECSタスク定義に相当する設定をドキュメント化:

**task-definition.md**:
```markdown
# タスク定義

## 基本設定

| 項目 | 値 |
|------|-----|
| Family | ecs-app |
| CPU | 256 |
| Memory | 512 |
| Network Mode | awsvpc |

## コンテナ定義

| 項目 | 値 |
|------|-----|
| Image | xxxxxxxxxx.dkr.ecr.ap-northeast-1.amazonaws.com/ecs-app:latest |
| Port | 3000 |
| Health Check | /health |

## 環境変数

| 変数 | 値 |
|------|-----|
| NODE_ENV | production |
```

## ✅ 完了条件

- [ ] Dockerfileがマルチステージビルドになっている
- [ ] 非rootユーザーで実行されている
- [ ] ヘルスチェックが設定されている
- [ ] 負荷分散が動作している（コンテナ名が変わる）
- [ ] タスク定義がドキュメント化されている

## 💡 ヒント

<details>
<summary>イメージサイズの確認</summary>

```bash
docker images | grep ecs-app
# 100MB以下を目指す
```

</details>

## 📤 提出物

- `exercise-02/app/Dockerfile`
- `exercise-02/app/src/index.js`
- `exercise-02/docker-compose.yml`
- `exercise-02/nginx.conf`
- `exercise-02/task-definition.md`
- 動作確認のスクリーンショット

## 🔗 参考

- [ECS/Fargate基礎](../13-cloud-practice-03.md)

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../../docs/terms-of-use.md)をご覧ください。
