# 課題1: CDKプロジェクト作成とS3バケット

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐ |
| 所要時間 | 30分 |
| 前提知識 | TypeScript基礎 |

## 🎯 目標

AWS CDKプロジェクトを作成し、S3バケットをLocalStackにデプロイする。

## 📝 課題内容

### Step 1: CDKプロジェクトの初期化

```bash
mkdir exercise-01 && cd exercise-01
cdk init app --language typescript
```

### Step 2: S3バケットの定義

`lib/exercise-01-stack.ts`を編集し、以下の要件を満たすS3バケットを作成してください。

**要件**:

1. **バケット名**: `bootcamp-exercise-01-bucket`（または一意の名前）
2. **バージョニング**: 有効
3. **暗号化**: S3マネージド暗号化
4. **パブリックアクセス**: すべてブロック
5. **削除時の動作**: バケットとオブジェクトを削除（`RemovalPolicy.DESTROY`）

### Step 3: LocalStackへのデプロイ

```bash
# CloudFormationテンプレートを確認
cdklocal synth

# デプロイ
cdklocal deploy

# バケット一覧を確認
aws --endpoint-url=http://localhost:4566 s3 ls
```

### Step 4: 動作確認

```bash
# ファイルをアップロード
echo "Hello CDK!" > test.txt
aws --endpoint-url=http://localhost:4566 s3 cp test.txt s3://bootcamp-exercise-01-bucket/

# ファイル一覧
aws --endpoint-url=http://localhost:4566 s3 ls s3://bootcamp-exercise-01-bucket/

# ダウンロード
aws --endpoint-url=http://localhost:4566 s3 cp s3://bootcamp-exercise-01-bucket/test.txt downloaded.txt
cat downloaded.txt
```

## ✅ 完了条件

- [ ] `cdk synth`でエラーなくCloudFormationテンプレートが生成される
- [ ] LocalStackにデプロイできる
- [ ] S3バケットにファイルをアップロード/ダウンロードできる

## 💡 ヒント

<details>
<summary>S3バケットの基本的な定義</summary>

```typescript
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cdk from 'aws-cdk-lib';

new s3.Bucket(this, 'MyBucket', {
  bucketName: 'my-bucket-name',
  versioned: true,
  encryption: s3.BucketEncryption.S3_MANAGED,
  blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
  removalPolicy: cdk.RemovalPolicy.DESTROY,
  autoDeleteObjects: true,
});
```

</details>

## 📤 提出物

- `exercise-01/lib/exercise-01-stack.ts`
- `exercise-01/cdk.json`
- スクリーンショット（デプロイ成功、S3操作）

## 🔗 参考

- [AWS CDK基礎](../12-iac-basics-02.md)

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../../docs/terms-of-use.md)をご覧ください。
