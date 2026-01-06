# 課題2: Dockerfile作成

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐⭐ |
| 所要時間 | 45分 |

## 🎯 目標

Node.jsアプリケーション用のDockerfileを作成する。

## 📝 課題内容

### 課題2-1: シンプルなNode.jsアプリ

1. プロジェクトを作成

```bash
mkdir docker-node-app
cd docker-node-app
npm init -y
npm install express
```

2. `index.js`を作成

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Docker!' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

3. `Dockerfile`を作成

```dockerfile
# ベースイメージを指定
FROM node:20-slim

# 作業ディレクトリを設定


# package.jsonをコピー


# 依存関係をインストール


# アプリケーションをコピー


# ポートを公開


# 起動コマンド

```

4. イメージをビルド

```bash
docker build -t docker-node-app .
```

5. コンテナを起動

```bash
docker run -d -p 3000:3000 docker-node-app
```

6. http://localhost:3000 にアクセスして確認

### 課題2-2: .dockerignore

`.dockerignore`ファイルを作成して、不要なファイルを除外してください。

```
node_modules
npm-debug.log
.git
.gitignore
```

### 課題2-3: マルチステージビルド（発展）

TypeScriptアプリ用のマルチステージビルドDockerfileを作成してください。

- ビルドステージ: TypeScriptをコンパイル
- 実行ステージ: コンパイル済みJSを実行

## ✅ 完了条件

- [ ] Dockerfileでイメージをビルドできた
- [ ] コンテナを起動してアクセスできた
- [ ] .dockerignoreを作成した

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../../docs/terms-of-use.md)をご覧ください。
