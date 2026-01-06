# マルチコンテナ構成

## 📋 概要

| 項目 | 内容 |
|------|------|
| 所要時間 | 60分 |
| 難易度 | [中級] |
| 前提知識 | Docker Compose基礎 |

## 🎯 なぜこれを学ぶのか

実際のシステムは複数のサービスが連携して動作します。

```mermaid
flowchart TB
    LB[ロードバランサー]
    subgraph app[アプリケーション層]
        A1[App 1]
        A2[App 2]
    end
    subgraph data[データ層]
        DB[(Primary DB)]
        DBR[(Replica DB)]
        R[(Redis)]
    end
    
    LB --> A1
    LB --> A2
    A1 --> DB
    A2 --> DB
    DB --> DBR
    A1 --> R
    A2 --> R
```

適切なマルチコンテナ構成を設計することで、スケーラブルで堅牢なシステムを構築できます。

## 📚 学習内容

### 1. マルチコンテナのパターン

#### 1.1 一般的な構成パターン

```mermaid
flowchart LR
    subgraph pattern1[パターン1: 3層アーキテクチャ]
        P1F[Frontend] --> P1B[Backend] --> P1D[(DB)]
    end
```

```mermaid
flowchart LR
    subgraph pattern2[パターン2: キャッシュ付き]
        P2F[Frontend] --> P2B[Backend]
        P2B --> P2R[(Redis)]
        P2B --> P2D[(DB)]
    end
```

```mermaid
flowchart LR
    subgraph pattern3[パターン3: メッセージキュー]
        P3A[API] --> P3Q[(Queue)]
        P3Q --> P3W[Worker]
        P3W --> P3D[(DB)]
    end
```

### 2. サービス間通信

#### 2.1 Docker内部DNS

```yaml
services:
  backend:
    image: myapp/backend
    # 他のサービスからは "backend" でアクセス可能
  
  frontend:
    image: myapp/frontend
    environment:
      # サービス名で接続
      - API_URL=http://backend:3000
```

```mermaid
flowchart LR
    F[frontend] -->|http://backend:3000| B[backend]
    B -->|postgres://db:5432| D[db]
```

#### 2.2 接続文字列の例

| サービス | 接続文字列 |
|----------|-----------|
| PostgreSQL | `postgres://user:pass@db:5432/dbname` |
| MySQL | `mysql://user:pass@mysql:3306/dbname` |
| Redis | `redis://redis:6379` |
| MongoDB | `mongodb://mongo:27017/dbname` |

### 3. 依存関係と起動順序

#### 3.1 depends_on の基本

```yaml
services:
  backend:
    depends_on:
      - db
      - redis
```

⚠️ **注意**: `depends_on` はコンテナの起動順序のみを制御します。サービスが「準備完了」になるまで待つわけではありません。

#### 3.2 ヘルスチェック付き depends_on

```yaml
services:
  db:
    image: postgres:15
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  backend:
    depends_on:
      db:
        condition: service_healthy  # DBが健全になるまで待つ
```

#### 3.3 起動順序の制御パターン

```mermaid
flowchart TD
    subgraph step1[Step 1]
        DB[(Database)]
        R[(Redis)]
    end
    
    subgraph step2[Step 2]
        B[Backend]
    end
    
    subgraph step3[Step 3]
        F[Frontend]
    end
    
    step1 --> step2 --> step3
```

```yaml
services:
  db:
    image: postgres:15
    healthcheck:
      test: ["CMD-SHELL", "pg_isready"]
      interval: 5s
      retries: 5

  redis:
    image: redis:7
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      retries: 5

  backend:
    build: ./backend
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 10s
      retries: 3

  frontend:
    build: ./frontend
    depends_on:
      backend:
        condition: service_healthy
```

### 4. データの永続化

#### 4.1 Named Volume

```yaml
services:
  db:
    image: postgres:15
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:  # Docker が管理
```

#### 4.2 Bind Mount（開発用）

```yaml
services:
  backend:
    volumes:
      - ./backend/src:/app/src  # ホストのディレクトリを直接マウント
```

#### 4.3 データベースの初期化

```yaml
services:
  db:
    image: postgres:15
    volumes:
      - db-data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql  # 初期化SQL
```

### 5. 実践：フルスタック構成

#### 5.1 完全なcompose.yaml

```yaml
services:
  # ----------------------------------------
  # フロントエンド
  # ----------------------------------------
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:3001
    volumes:
      - ./frontend/src:/app/src
      - ./frontend/public:/app/public
    depends_on:
      backend:
        condition: service_healthy
    restart: unless-stopped

  # ----------------------------------------
  # バックエンドAPI
  # ----------------------------------------
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3001:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgres://postgres:password@db:5432/myapp
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET:-development-secret}
    volumes:
      - ./backend/src:/app/src
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 10s
      timeout: 5s
      retries: 3
    restart: unless-stopped

  # ----------------------------------------
  # データベース
  # ----------------------------------------
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myapp
    volumes:
      - db-data:/var/lib/postgresql/data
      - ./db/init:/docker-entrypoint-initdb.d
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  # ----------------------------------------
  # Redis（キャッシュ・セッション）
  # ----------------------------------------
  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis-data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5
    restart: unless-stopped

  # ----------------------------------------
  # MailHog（開発用メールサーバー）
  # ----------------------------------------
  mailhog:
    image: mailhog/mailhog
    ports:
      - "1025:1025"  # SMTP
      - "8025:8025"  # Web UI

volumes:
  db-data:
  redis-data:
```

### 6. トラブルシューティング

#### 6.1 よくある問題と解決策

| 問題 | 原因 | 解決策 |
|------|------|--------|
| 接続できない | サービス名の間違い | `docker compose ps` で確認 |
| DBに接続できない | 起動順序 | `healthcheck` + `depends_on` |
| データが消える | ボリューム未設定 | `volumes` を追加 |
| ポートが使用中 | 他のプロセス | `lsof -i :3000` で確認 |

#### 6.2 デバッグコマンド

```bash
# ネットワーク確認
docker compose exec backend ping db

# DNSの確認
docker compose exec backend nslookup db

# ログの確認
docker compose logs -f backend

# コンテナに入る
docker compose exec backend sh
```

## ✅ まとめ

| 項目 | ポイント |
|------|---------|
| **サービス間通信** | サービス名でアクセス（Docker DNS） |
| **起動順序** | `healthcheck` + `depends_on` で制御 |
| **データ永続化** | Named Volume を使用 |
| **環境分離** | override ファイルで開発/本番を分離 |

## 💬 考えてみよう

```
Q: ヘルスチェックがないとどんな問題が起きますか？
Q: 開発環境と本番環境でボリュームの設定を変える理由は？
Q: マイクロサービスでコンテナを分ける基準は何ですか？
```

## 🔗 次のコンテンツ

[本番運用のベストプラクティス](11-container-advanced-05.md)に進んでください。

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../docs/terms-of-use.md)をご覧ください。
