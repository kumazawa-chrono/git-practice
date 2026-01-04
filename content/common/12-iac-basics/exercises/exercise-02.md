# 課題2: Lambda + DynamoDB構成

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐⭐ |
| 所要時間 | 60分 |
| 前提知識 | CDK基礎 |

## 🎯 目標

Lambda関数からDynamoDBにアクセスする構成をCDKで構築する。

## 📝 課題内容

### アーキテクチャ

```
┌──────────────┐    ┌──────────────┐
│   Lambda     │───▶│  DynamoDB    │
│  (Node.js)   │    │   (Table)    │
└──────────────┘    └──────────────┘
```

### Step 1: プロジェクト構造

```
exercise-02/
├── bin/
│   └── exercise-02.ts
├── lib/
│   └── exercise-02-stack.ts
├── lambda/
│   └── handler.ts
├── test/
│   └── exercise-02.test.ts
└── cdk.json
```

### Step 2: DynamoDBテーブルの定義

以下の要件を満たすDynamoDBテーブルを作成:

| 項目 | 値 |
|------|-----|
| テーブル名 | `Items` |
| パーティションキー | `id` (String) |
| ソートキー | `createdAt` (String) |
| 課金モード | オンデマンド |

### Step 3: Lambda関数の作成

**lambda/handler.ts**:
```typescript
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { 
  DynamoDBDocumentClient, 
  PutCommand, 
  ScanCommand 
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
  endpoint: process.env.DYNAMODB_ENDPOINT || undefined,
});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME!;

export const handler = async (event: any) => {
  const { action, item } = JSON.parse(event.body || '{}');

  try {
    if (action === 'put') {
      await docClient.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          id: item.id || crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          ...item,
        },
      }));
      return { statusCode: 201, body: JSON.stringify({ message: 'Created' }) };
    }

    if (action === 'list') {
      const result = await docClient.send(new ScanCommand({
        TableName: TABLE_NAME,
      }));
      return { statusCode: 200, body: JSON.stringify(result.Items) };
    }

    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid action' }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: String(error) }) };
  }
};
```

### Step 4: CDKスタックの実装

`lib/exercise-02-stack.ts`で以下を実装:

1. **DynamoDBテーブル**（上記要件）
2. **Lambda関数**
   - ランタイム: Node.js 18.x
   - ハンドラ: `handler.handler`
   - 環境変数: `TABLE_NAME`にテーブル名を設定
3. **権限設定**
   - LambdaにDynamoDBへの読み書き権限を付与

### Step 5: テストの作成

`test/exercise-02.test.ts`:
```typescript
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Exercise02Stack } from '../lib/exercise-02-stack';

test('DynamoDB Table Created', () => {
  const app = new cdk.App();
  const stack = new Exercise02Stack(app, 'TestStack');
  const template = Template.fromStack(stack);

  // DynamoDBテーブルが作成されること
  template.resourceCountIs('AWS::DynamoDB::Table', 1);

  // オンデマンド課金であること
  template.hasResourceProperties('AWS::DynamoDB::Table', {
    BillingMode: 'PAY_PER_REQUEST',
  });
});

test('Lambda Function Created', () => {
  const app = new cdk.App();
  const stack = new Exercise02Stack(app, 'TestStack');
  const template = Template.fromStack(stack);

  // Lambda関数が作成されること
  template.resourceCountIs('AWS::Lambda::Function', 1);

  // Node.js 18であること
  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: 'nodejs18.x',
  });
});
```

### Step 6: デプロイと動作確認

```bash
# テスト実行
npm test

# デプロイ
cdklocal deploy

# Lambda関数を呼び出し（アイテム追加）
aws --endpoint-url=http://localhost:4566 lambda invoke \
  --function-name Exercise02Stack-ItemsHandler... \
  --payload '{"body": "{\"action\": \"put\", \"item\": {\"name\": \"Test Item\"}}"}' \
  output.json

# Lambda関数を呼び出し（一覧取得）
aws --endpoint-url=http://localhost:4566 lambda invoke \
  --function-name Exercise02Stack-ItemsHandler... \
  --payload '{"body": "{\"action\": \"list\"}"}' \
  output.json

cat output.json
```

## ✅ 完了条件

- [ ] `npm test`でテストが通る
- [ ] LocalStackにデプロイできる
- [ ] Lambda経由でDynamoDBにデータを追加/取得できる

## 💡 ヒント

<details>
<summary>DynamoDBテーブルの定義</summary>

```typescript
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

const table = new dynamodb.Table(this, 'Table', {
  tableName: 'Items',
  partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
  sortKey: { name: 'createdAt', type: dynamodb.AttributeType.STRING },
  billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
  removalPolicy: cdk.RemovalPolicy.DESTROY,
});
```

</details>

<details>
<summary>Lambda関数の定義とDynamoDB権限</summary>

```typescript
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

const fn = new nodejs.NodejsFunction(this, 'Handler', {
  entry: 'lambda/handler.ts',
  handler: 'handler',
  runtime: lambda.Runtime.NODEJS_18_X,
  environment: {
    TABLE_NAME: table.tableName,
  },
});

table.grantReadWriteData(fn);
```

</details>

## 📤 提出物

- `exercise-02/lib/exercise-02-stack.ts`
- `exercise-02/lambda/handler.ts`
- `exercise-02/test/exercise-02.test.ts`
- テスト結果のスクリーンショット

## 🔗 参考

- [AWS CDK実践](../12-iac-basics-03.md)
