# 課題3: サーバーレスAPI構築

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐⭐⭐ |
| 所要時間 | 90分 |
| 前提知識 | Lambda + DynamoDB構成 |

## 🎯 目標

API Gateway + Lambda + DynamoDBを使った、完全なサーバーレスREST APIを構築する。

## 📝 課題内容

### アーキテクチャ

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│    Client   │────▶│ API Gateway  │────▶│   Lambda     │
└─────────────┘     │              │     │              │
                    │ GET /items   │     │  getItems    │
                    │ POST /items  │     │  createItem  │
                    │ GET /items/{id}    │  getItem     │
                    │ DELETE /items/{id} │  deleteItem  │
                    └──────────────┘     └──────────────┘
                                               │
                                               ▼
                                        ┌──────────────┐
                                        │  DynamoDB    │
                                        │   (Items)    │
                                        └──────────────┘
```

### Step 1: プロジェクト構造

```
exercise-03/
├── bin/
│   └── exercise-03.ts
├── lib/
│   ├── exercise-03-stack.ts
│   └── constructs/
│       └── api-construct.ts
├── lambda/
│   ├── get-items.ts
│   ├── create-item.ts
│   ├── get-item.ts
│   └── delete-item.ts
├── test/
│   └── exercise-03.test.ts
└── cdk.json
```

### Step 2: 独自Construct の作成

再利用可能なAPI Constructを作成してください。

**lib/constructs/api-construct.ts**:
```typescript
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export interface ApiConstructProps {
  tableName: string;
}

export class ApiConstruct extends Construct {
  public readonly api: apigateway.RestApi;
  public readonly table: dynamodb.Table;

  constructor(scope: Construct, id: string, props: ApiConstructProps) {
    super(scope, id);

    // DynamoDBテーブル、Lambda関数、API Gatewayを作成
    // 実装してください
  }
}
```

### Step 3: Lambda関数の実装

**lambda/create-item.ts**:
```typescript
import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    await docClient.send(new PutCommand({
      TableName: process.env.TABLE_NAME!,
      Item: {
        id,
        createdAt,
        ...body,
      },
    }));

    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, createdAt, ...body }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: String(error) }),
    };
  }
};
```

他のLambda関数（get-items, get-item, delete-item）も実装してください。

### Step 4: API Gatewayの設定

以下のエンドポイントを作成:

| メソッド | パス | Lambda | 説明 |
|---------|------|--------|------|
| GET | /items | getItems | 全アイテム取得 |
| POST | /items | createItem | アイテム作成 |
| GET | /items/{id} | getItem | 特定アイテム取得 |
| DELETE | /items/{id} | deleteItem | アイテム削除 |

### Step 5: CORS設定

API GatewayにCORS設定を追加:

```typescript
const api = new apigateway.RestApi(this, 'Api', {
  restApiName: 'Items API',
  defaultCorsPreflightOptions: {
    allowOrigins: apigateway.Cors.ALL_ORIGINS,
    allowMethods: apigateway.Cors.ALL_METHODS,
    allowHeaders: ['Content-Type', 'Authorization'],
  },
});
```

### Step 6: 出力の設定

デプロイ後にAPI URLを取得できるよう、CfnOutputを追加:

```typescript
new cdk.CfnOutput(this, 'ApiUrl', {
  value: api.url,
  description: 'API Gateway URL',
});
```

### Step 7: テストとデプロイ

```bash
# テスト
npm test

# デプロイ
cdklocal deploy

# 出力されたAPI URLを確認
# API URL: https://xxxxx.execute-api.localhost.localstack.cloud:4566/prod/
```

### Step 8: 動作確認

```bash
API_URL="http://localhost:4566/restapis/xxxxx/prod/_user_request_"

# アイテム作成
curl -X POST $API_URL/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Item", "description": "This is a test"}'

# 全アイテム取得
curl $API_URL/items

# 特定アイテム取得
curl $API_URL/items/{id}

# アイテム削除
curl -X DELETE $API_URL/items/{id}
```

## ✅ 完了条件

- [ ] 独自Constructを作成できている
- [ ] すべてのCRUD操作が動作する
- [ ] CORSが正しく設定されている
- [ ] テストが通る
- [ ] API URLが出力される

## 📊 評価ポイント

| 項目 | 配点 |
|------|:----:|
| Construct設計 | 25% |
| Lambda実装 | 25% |
| API Gateway設定 | 20% |
| テスト | 20% |
| コード品質 | 10% |

## 💡 ヒント

<details>
<summary>API Gatewayのリソース追加</summary>

```typescript
const items = api.root.addResource('items');
items.addMethod('GET', new apigateway.LambdaIntegration(getItemsFn));
items.addMethod('POST', new apigateway.LambdaIntegration(createItemFn));

const item = items.addResource('{id}');
item.addMethod('GET', new apigateway.LambdaIntegration(getItemFn));
item.addMethod('DELETE', new apigateway.LambdaIntegration(deleteItemFn));
```

</details>

<details>
<summary>パスパラメータの取得</summary>

```typescript
// Lambda内でパスパラメータを取得
const id = event.pathParameters?.id;
```

</details>

## 📤 提出物

- `exercise-03/lib/exercise-03-stack.ts`
- `exercise-03/lib/constructs/api-construct.ts`
- `exercise-03/lambda/` 以下の全ファイル
- `exercise-03/test/exercise-03.test.ts`
- 動作確認のスクリーンショット（curl実行結果）

## 🔗 参考

- [AWS CDK実践](../12-iac-basics-03.md)
