# 12. IaC入門（AWS CDK） - 実践課題

## 📋 概要

このカテゴリでは、AWS CDK（TypeScript）を使ったインフラのコード化を学びます。

> ⚠️ **費用について**: 本課題ではLocalStackを使用するため、AWSの費用は発生しません。

## 🎯 学習目標

- [ ] CDKプロジェクトを作成・初期化できる
- [ ] 基本的なAWSリソース（S3、Lambda、DynamoDB）をCDKで定義できる
- [ ] スタックをLocalStackにデプロイできる
- [ ] CDKテストを作成できる

## 📝 課題一覧

| 課題 | 難易度 | 所要時間 | 内容 |
|------|:------:|:--------:|------|
| [課題1](exercise-01.md) | ⭐ | 30分 | CDKプロジェクト作成とS3バケット |
| [課題2](exercise-02.md) | ⭐⭐ | 60分 | Lambda + DynamoDB構成 |
| [課題3](exercise-03.md) | ⭐⭐⭐ | 90分 | サーバーレスAPI構築 |

## 🔧 事前準備

### 1. Node.js / npm

```bash
node --version  # v18以上
npm --version
```

### 2. AWS CDK CLI

```bash
npm install -g aws-cdk
cdk --version
```

### 3. LocalStack（ローカルAWS環境）

```bash
# Docker Composeで起動
cat << 'EOF' > docker-compose.yml
services:
  localstack:
    image: localstack/localstack
    ports:
      - "4566:4566"
    environment:
      - SERVICES=s3,lambda,dynamodb,apigateway,iam,cloudformation
      - DEBUG=1
    volumes:
      - localstack-data:/var/lib/localstack
      - /var/run/docker.sock:/var/run/docker.sock

volumes:
  localstack-data:
EOF

docker compose up -d
```

### 4. cdklocal（LocalStack用CDK）

```bash
npm install -g aws-cdk-local
cdklocal --version
```

### 5. AWS CLI（LocalStack用設定）

```bash
# ~/.aws/credentials に追加
[localstack]
aws_access_key_id = test
aws_secret_access_key = test

# ~/.aws/config に追加
[profile localstack]
region = ap-northeast-1
output = json
```

## 📁 提出方法

1. 各課題のCDKプロジェクトを作成
2. `cdk synth`でCloudFormationテンプレートを生成
3. PRを作成して提出

```
exercises/
├── exercise-01/
│   ├── bin/
│   ├── lib/
│   ├── test/
│   └── cdk.json
├── exercise-02/
│   └── ...
└── exercise-03/
    └── ...
```

## 💡 LocalStackでのデプロイ手順

```bash
# LocalStackにブートストラップ
cdklocal bootstrap

# デプロイ
cdklocal deploy

# スタック一覧
cdklocal list

# 削除
cdklocal destroy
```

## 🔗 参考

- [AWS CDK基礎](../12-iac-basics-02.md)
- [LocalStack公式](https://localstack.cloud/)
