# 13. クラウド実践 - 実践課題

## 📋 概要

このカテゴリでは、AWS上での本番運用を意識したアーキテクチャ設計とECS/Fargateでのコンテナデプロイを学びます。

> ⚠️ **費用について**: 
> - 課題1・2はLocalStackで無料で学習できます
> - 課題3は実際のAWSを使用するため、費用が発生する可能性があります
> - AWS無料利用枠を活用し、学習後はリソースを削除してください

## 🎯 学習目標

- [ ] VPCとサブネットを適切に設計できる
- [ ] セキュリティグループを正しく設定できる
- [ ] ECS/Fargateでコンテナをデプロイできる
- [ ] ALBを使った負荷分散を設定できる

## 📝 課題一覧

| 課題 | 難易度 | 所要時間 | 内容 | 環境 |
|------|:------:|:--------:|------|:----:|
| [課題1](exercise-01.md) | ⭐ | 45分 | VPC設計（CDK） | LocalStack |
| [課題2](exercise-02.md) | ⭐⭐ | 60分 | ECS/Fargateローカル実行 | Docker |
| [課題3](exercise-03.md) | ⭐⭐⭐ | 120分 | 本番デプロイ | AWS |

## 🔧 事前準備

### LocalStack環境

```bash
# Docker Composeで起動
cat << 'EOF' > docker-compose.yml
services:
  localstack:
    image: localstack/localstack
    ports:
      - "4566:4566"
    environment:
      - SERVICES=ec2,ecs,elasticloadbalancing,cloudformation,iam,logs
      - DEBUG=1
    volumes:
      - localstack-data:/var/lib/localstack
      - /var/run/docker.sock:/var/run/docker.sock

volumes:
  localstack-data:
EOF

docker compose up -d
```

### AWS CLI設定

```bash
# LocalStack用
aws configure --profile localstack
# Access Key: test
# Secret Key: test
# Region: ap-northeast-1
```

## 📁 提出方法

1. 各課題のCDKプロジェクトまたは設定ファイルを作成
2. アーキテクチャ図（Mermaid）を含める
3. PRを作成して提出

```
exercises/
├── exercise-01/
│   ├── lib/
│   └── architecture.md
├── exercise-02/
│   ├── docker-compose.yml
│   └── Dockerfile
└── exercise-03/
    ├── lib/
    ├── architecture.md
    └── README.md
```

## 💡 費用を抑えるためのTips

1. **LocalStackを活用**: 課題1・2はLocalStackで十分
2. **無料利用枠**: 新規アカウントは12ヶ月間の無料枠あり
3. **Fargate Spot**: 開発環境では最大70%割引
4. **こまめに削除**: 学習後は`cdk destroy`でリソース削除
5. **コストアラート**: AWS Budgetsで予算アラートを設定

## 🔗 参考

- [クラウドアーキテクチャ](../13-cloud-practice-01.md)
- [ECS/Fargate基礎](../13-cloud-practice-03.md)
