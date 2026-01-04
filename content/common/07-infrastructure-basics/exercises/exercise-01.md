# 課題1: Docker基本操作

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐ |
| 所要時間 | 30分 |

## 🎯 目標

Dockerの基本操作（イメージ取得、コンテナ起動・停止）を習得する。

## 📝 課題内容

### 課題1-1: Nginxコンテナの起動

1. Nginxイメージを取得
```bash
docker pull nginx
```

2. コンテナを起動（ポート8080でアクセス）
```bash
docker run -d -p 8080:80 --name my-nginx nginx
```

3. ブラウザで http://localhost:8080 にアクセスして確認

4. コンテナの状態を確認
```bash
docker ps
```

5. コンテナを停止・削除
```bash
docker stop my-nginx
docker rm my-nginx
```

### 課題1-2: ログの確認

1. Nginxコンテナを再度起動
2. ブラウザで数回アクセス
3. ログを確認
```bash
docker logs my-nginx
```

### 課題1-3: コンテナ内に接続

1. コンテナ内のシェルに接続
```bash
docker exec -it my-nginx bash
```

2. Nginxの設定ファイルを確認
```bash
cat /etc/nginx/nginx.conf
```

3. exitで抜ける

## ✅ 完了条件

- [ ] Nginxコンテナを起動してブラウザでアクセスできた
- [ ] ログを確認できた
- [ ] コンテナ内に接続できた
