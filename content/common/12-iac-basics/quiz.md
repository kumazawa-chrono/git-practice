# 12. IaC入門（AWS CDK） - 理解度チェックテスト

## 📋 テストについて

| 項目 | 内容 |
|------|------|
| 問題数 | 15問 |
| 目安時間 | 15分 |
| 合格ライン | 12問以上正解（80%） |

> 💡 このテストはコンテンツを読んだ後に解いてください。
> 答えは折りたたみ内にあります。

---

## 問題

### 【基礎】IaCの概念

#### Q1. Infrastructure as Code（IaC）の主なメリットとして、最も適切なものはどれですか？

- A) サーバーの物理的な性能が向上する
- B) インフラの構成をバージョン管理でき、再現性が高まる
- C) クラウドの利用料金が無料になる
- D) プログラミング知識が不要になる

<details>
<summary>回答と解説</summary>

**正解: B**

IaCの主なメリット：
- **再現性**: コードから同じ環境を何度でも構築
- **バージョン管理**: Gitで変更履歴を追跡
- **レビュー**: PRでインフラ変更をレビュー
- **自動化**: CI/CDパイプラインと統合

</details>

---

#### Q2. 手動でのインフラ管理と比較した場合、IaCが解決する問題はどれですか？

- A) ネットワーク帯域の向上
- B) 「誰が何を変えたかわからない」問題
- C) ハードウェアコストの削減
- D) プログラミング言語の学習

<details>
<summary>回答と解説</summary>

**正解: B**

手動管理の問題点：
- 変更履歴がない（誰が何を変えたかわからない）
- 再現性がない（同じ環境を再構築できない）
- ミスが起きやすい（手作業による設定ミス）

IaCはこれらをすべて解決します。

</details>

---

#### Q3. AWS CDKの特徴として、正しいものはどれですか？

- A) YAML専用のツール
- B) TypeScriptなどのプログラミング言語でAWSリソースを定義できる
- C) AWSとは無関係のツール
- D) 設定ファイルを手動で編集する必要がある

<details>
<summary>回答と解説</summary>

**正解: B**

AWS CDKは、TypeScript、Python、Java等のプログラミング言語でAWSリソースを定義できます。

メリット：
- 型安全（TypeScript）
- IDEの補完が効く
- 既存の言語知識を活用できる

</details>

---

### 【基礎】AWS CDK基礎

#### Q4. AWS CDKの基本的な階層構造として、正しい順序はどれですか？

- A) Construct → Stack → App
- B) Stack → App → Construct
- C) App → Stack → Construct
- D) App → Construct → Stack

<details>
<summary>回答と解説</summary>

**正解: C**

CDKの階層構造：
1. **App**: CDKアプリケーション全体
2. **Stack**: CloudFormationスタック（デプロイ単位）
3. **Construct**: AWSリソースの抽象化

```
App
├── Stack (Dev)
│   ├── Construct (VPC)
│   └── Construct (Lambda)
└── Stack (Prod)
    ├── Construct (VPC)
    └── Construct (Lambda)
```

</details>

---

#### Q5. `cdk synth` コマンドの役割は何ですか？

- A) AWSにリソースをデプロイする
- B) CDKコードからCloudFormationテンプレートを生成する
- C) AWSリソースを削除する
- D) CDKプロジェクトを初期化する

<details>
<summary>回答と解説</summary>

**正解: B**

CDKコマンド：
- `cdk synth`: CloudFormationテンプレートを生成（デプロイしない）
- `cdk diff`: 現在の環境との差分を確認
- `cdk deploy`: AWSにデプロイ
- `cdk destroy`: リソースを削除

</details>

---

#### Q6. L1、L2、L3 Constructの説明として、正しいものはどれですか？

- A) L1が最も抽象化されており、L3が最も低レベル
- B) L2が推奨され、CloudFormationより使いやすいAPI
- C) すべて同じ機能を持つ
- D) L3はテスト専用

<details>
<summary>回答と解説</summary>

**正解: B**

| レベル | 説明 | 例 |
|--------|------|-----|
| **L1** | CloudFormation直接（Cfn〜） | CfnBucket |
| **L2** | 抽象化されたAPI（推奨） | Bucket |
| **L3** | 複数リソースのパターン | ApplicationLoadBalancedFargateService |

L2が最も使いやすく、推奨されます。

</details>

---

#### Q7. 以下のCDKコードが作成するリソースは何ですか？

```typescript
new s3.Bucket(this, 'MyBucket', {
  versioned: true,
});
```

- A) EC2インスタンス
- B) Lambda関数
- C) S3バケット（バージョニング有効）
- D) DynamoDBテーブル

<details>
<summary>回答と解説</summary>

**正解: C**

このコードは、バージョニングが有効なS3バケットを作成します。
- `s3.Bucket`: S3バケットのL2 Construct
- `versioned: true`: オブジェクトのバージョン管理を有効化

</details>

---

### 【中級】AWS CDK実践

#### Q8. `RemovalPolicy.DESTROY` を設定する理由は何ですか？

- A) リソースのパフォーマンスを向上させる
- B) スタック削除時にリソースも一緒に削除する
- C) リソースを暗号化する
- D) リソースをバックアップする

<details>
<summary>回答と解説</summary>

**正解: B**

デフォルトでは、スタックを削除してもS3バケット等は残ります（データ保護のため）。

開発環境では`RemovalPolicy.DESTROY`で削除を許可：
```typescript
new s3.Bucket(this, 'Bucket', {
  removalPolicy: cdk.RemovalPolicy.DESTROY,
  autoDeleteObjects: true,
});
```

本番環境では`RETAIN`（削除しない）を推奨します。

</details>

---

#### Q9. LambdaにDynamoDBへの読み書き権限を付与する正しい方法はどれですか？

- A) `lambda.addPermission(table)`
- B) `table.grantReadWriteData(lambdaFunction)`
- C) `dynamodb.addAccess(lambda)`
- D) IAMポリシーを手動で作成する必要がある

<details>
<summary>回答と解説</summary>

**正解: B**

CDKでは`grant*`メソッドで簡単に権限を付与できます：
```typescript
table.grantReadWriteData(lambdaFunction);  // 読み書き
table.grantReadData(lambdaFunction);       // 読み取りのみ
bucket.grantRead(lambdaFunction);          // S3読み取り
```

CDKが自動的に適切なIAMポリシーを生成します。

</details>

---

#### Q10. 環境ごとにスタックを分ける主な理由は何ですか？

- A) コードを短くするため
- B) 開発/本番で異なる設定を適用し、影響を分離するため
- C) AWSの制限を回避するため
- D) コンパイル時間を短縮するため

<details>
<summary>回答と解説</summary>

**正解: B**

環境分離のメリット：
- 開発環境の変更が本番に影響しない
- 環境ごとに異なるリソースサイズ、設定を適用
- 本番のみ`RemovalPolicy.RETAIN`を適用

```typescript
new MyStack(app, 'Dev', { environment: 'development' });
new MyStack(app, 'Prod', { environment: 'production' });
```

</details>

---

#### Q11. NodejsFunctionの主なメリットは何ですか？

- A) 自動的にesbuildでバンドルされ、依存関係を含められる
- B) Python専用のConstruct
- C) EC2上で実行される
- D) 手動でzipファイルを作成する必要がある

<details>
<summary>回答と解説</summary>

**正解: A**

`NodejsFunction`は：
- esbuildで自動的にTypeScript/JavaScriptをバンドル
- `node_modules`の依存関係を含める
- Tree shakingでサイズを最適化

```typescript
new nodejs.NodejsFunction(this, 'Handler', {
  entry: 'lambda/handler.ts',
  handler: 'handler',
  runtime: lambda.Runtime.NODEJS_18_X,
});
```

</details>

---

#### Q12. API GatewayでLambdaと連携させる際に使用するクラスはどれですか？

- A) `lambda.Function`
- B) `apigateway.LambdaIntegration`
- C) `s3.BucketPolicy`
- D) `ecs.Service`

<details>
<summary>回答と解説</summary>

**正解: B**

API GatewayとLambdaの連携：
```typescript
const api = new apigateway.RestApi(this, 'Api');
const integration = new apigateway.LambdaIntegration(lambdaFn);
api.root.addMethod('GET', integration);
```

`LambdaIntegration`がAPI GatewayとLambdaを接続します。

</details>

---

### 【応用】テストと運用

#### Q13. CDKスナップショットテストの目的は何ですか？

- A) アプリケーションのパフォーマンスをテストする
- B) 生成されるCloudFormationテンプレートの変更を検知する
- C) AWSの料金を計算する
- D) コードのフォーマットをチェックする

<details>
<summary>回答と解説</summary>

**正解: B**

スナップショットテストは、生成されるCloudFormationテンプレートを保存し、意図しない変更がないかを検知します。

```typescript
test('Snapshot', () => {
  const app = new cdk.App();
  const stack = new MyStack(app, 'Test');
  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});
```

</details>

---

#### Q14. LocalStackを使用する主なメリットは何ですか？

- A) AWSの本番環境にデプロイできる
- B) ローカルでAWSサービスをエミュレートし、費用をかけずにテストできる
- C) コードの実行速度が向上する
- D) セキュリティが向上する

<details>
<summary>回答と解説</summary>

**正解: B**

LocalStackは、ローカル環境でAWSサービスをエミュレートします：
- 費用がかからない
- ネットワーク遅延がない
- オフラインでもテスト可能

```bash
cdklocal deploy  # LocalStackにデプロイ
```

</details>

---

#### Q15. CfnOutputの用途として正しいものはどれですか？

- A) リソースを作成する
- B) デプロイ後に値（API URLなど）を出力する
- C) リソースを削除する
- D) テストを実行する

<details>
<summary>回答と解説</summary>

**正解: B**

`CfnOutput`はデプロイ後に重要な値を出力します：
```typescript
new cdk.CfnOutput(this, 'ApiUrl', {
  value: api.url,
  description: 'API Gateway URL',
});
```

出力例：
```
Outputs:
ApiUrl = https://xxxxx.execute-api.ap-northeast-1.amazonaws.com/prod/
```

</details>

---

## 📊 結果

正解数を数えて、以下で確認してください。

| 正解数 | 判定 | アドバイス |
|:------:|:----:|-----------|
| 12-15問 | ✅ 合格 | 次のカテゴリに進んでください |
| 9-11問 | ⚠️ 惜しい | 間違えた箇所を復習してください |
| 8問以下 | ❌ 要復習 | コンテンツを読み直してください |

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../docs/terms-of-use.md)をご覧ください。
