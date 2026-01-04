# ネットワーク設計

## 📋 概要

| 項目 | 内容 |
|------|------|
| 所要時間 | 60分 |
| 難易度 | [中級] |
| 前提知識 | クラウドアーキテクチャ、ネットワーク基礎 |

## 🎯 なぜこれを学ぶのか

AWSのネットワーク設計は、セキュリティとスケーラビリティの基盤です。

```mermaid
flowchart TB
    subgraph vpc[VPC]
        subgraph public[Public Subnet]
            ALB[ALB]
            NAT[NAT Gateway]
        end
        subgraph private[Private Subnet]
            ECS[ECS]
            RDS[(RDS)]
        end
    end
    
    Internet[インターネット] --> ALB
    ECS --> NAT --> Internet
```

## 📚 学習内容

### 1. VPC（Virtual Private Cloud）

#### 1.1 VPCとは

**VPC** = AWS上の仮想ネットワーク

```mermaid
flowchart TB
    subgraph aws[AWS Cloud]
        subgraph vpc1[VPC A: 10.0.0.0/16]
            A1[リソース]
        end
        subgraph vpc2[VPC B: 10.1.0.0/16]
            B1[リソース]
        end
    end
```

| コンポーネント | 説明 |
|---------------|------|
| **VPC** | 仮想ネットワーク、IPアドレス範囲を定義 |
| **サブネット** | VPC内のIPアドレス範囲のサブセット |
| **ルートテーブル** | トラフィックの転送先を定義 |
| **インターネットゲートウェイ** | インターネットとの接続点 |

#### 1.2 CIDRブロック

```
10.0.0.0/16 = 65,536個のIPアドレス
├── 10.0.0.0/24 = 256個（Public Subnet AZ-a）
├── 10.0.1.0/24 = 256個（Public Subnet AZ-c）
├── 10.0.2.0/24 = 256個（Private Subnet AZ-a）
└── 10.0.3.0/24 = 256個（Private Subnet AZ-c）
```

### 2. サブネット設計

#### 2.1 Public vs Private サブネット

```mermaid
flowchart TB
    IGW[Internet Gateway]
    
    subgraph vpc[VPC]
        subgraph public[Public Subnet]
            ALB[ALB<br/>パブリックIP]
            NAT[NAT Gateway<br/>Elastic IP]
        end
        subgraph private[Private Subnet]
            ECS[ECS<br/>プライベートIP]
            RDS[(RDS<br/>プライベートIP)]
        end
    end
    
    IGW <--> public
    private --> NAT --> IGW
```

| 種類 | インターネットアクセス | 用途 |
|------|----------------------|------|
| **Public** | 双方向（IGW経由） | ALB、踏み台サーバー |
| **Private** | 外向きのみ（NAT経由） | アプリサーバー、DB |
| **Isolated** | なし | 機密データ |

#### 2.2 マルチAZ設計

```mermaid
flowchart TB
    subgraph vpc[VPC 10.0.0.0/16]
        subgraph az1[AZ-a]
            pub1[Public<br/>10.0.0.0/24]
            priv1[Private<br/>10.0.2.0/24]
        end
        subgraph az2[AZ-c]
            pub2[Public<br/>10.0.1.0/24]
            priv2[Private<br/>10.0.3.0/24]
        end
    end
```

### 3. セキュリティグループ

#### 3.1 セキュリティグループとは

**セキュリティグループ** = 仮想ファイアウォール（ステートフル）

```mermaid
flowchart LR
    Internet -->|Inbound| SG[Security Group]
    SG -->|Outbound| Internet
```

#### 3.2 ルール設計

```
# ALB用セキュリティグループ
Inbound:
  - HTTP (80) from 0.0.0.0/0
  - HTTPS (443) from 0.0.0.0/0

# アプリサーバー用セキュリティグループ
Inbound:
  - Custom TCP (3000) from ALB-SG

# データベース用セキュリティグループ
Inbound:
  - PostgreSQL (5432) from App-SG
```

#### 3.3 チェーン構成

```mermaid
flowchart LR
    Internet -->|443| ALB_SG[ALB SG]
    ALB_SG -->|3000| APP_SG[App SG]
    APP_SG -->|5432| DB_SG[DB SG]
```

### 4. ルートテーブル

#### 4.1 Publicサブネットのルートテーブル

```
Destination     Target
10.0.0.0/16     local
0.0.0.0/0       igw-xxxxx  ← インターネットゲートウェイ
```

#### 4.2 Privateサブネットのルートテーブル

```
Destination     Target
10.0.0.0/16     local
0.0.0.0/0       nat-xxxxx  ← NATゲートウェイ
```

### 5. VPCエンドポイント

#### 5.1 VPCエンドポイントとは

**VPCエンドポイント** = AWSサービスへのプライベート接続

```mermaid
flowchart LR
    subgraph vpc[VPC]
        Lambda[Lambda]
        VPCE[VPC Endpoint]
    end
    
    S3[S3]
    
    Lambda --> VPCE --> S3
    Lambda -.->|NAT経由だと課金| S3
```

#### 5.2 エンドポイントの種類

| 種類 | 対象 | 料金 |
|------|------|------|
| **Gateway** | S3, DynamoDB | 無料 |
| **Interface** | その他のサービス | 有料 |

### 6. 実践：VPC設計

#### 6.1 標準的な設計パターン

```mermaid
flowchart TB
    subgraph vpc[VPC 10.0.0.0/16]
        subgraph public[Public Subnets]
            ALB[ALB]
            NAT1[NAT GW]
            NAT2[NAT GW]
        end
        
        subgraph app[Application Subnets]
            ECS1[ECS]
            ECS2[ECS]
        end
        
        subgraph data[Data Subnets]
            RDS1[(RDS Primary)]
            RDS2[(RDS Standby)]
        end
    end
    
    Internet --> ALB
    ALB --> ECS1
    ALB --> ECS2
    ECS1 --> NAT1
    ECS2 --> NAT2
    ECS1 --> RDS1
    ECS2 --> RDS1
    RDS1 --> RDS2
```

#### 6.2 CDKでのVPC定義

```typescript
import * as ec2 from 'aws-cdk-lib/aws-ec2';

const vpc = new ec2.Vpc(this, 'MyVpc', {
  ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
  maxAzs: 2,
  natGateways: 2,
  subnetConfiguration: [
    {
      name: 'Public',
      subnetType: ec2.SubnetType.PUBLIC,
      cidrMask: 24,
    },
    {
      name: 'Application',
      subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      cidrMask: 24,
    },
    {
      name: 'Database',
      subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      cidrMask: 24,
    },
  ],
});

// S3のVPCエンドポイント（無料）
vpc.addGatewayEndpoint('S3Endpoint', {
  service: ec2.GatewayVpcEndpointAwsService.S3,
});
```

## ✅ まとめ

| コンポーネント | 役割 |
|---------------|------|
| **VPC** | 仮想ネットワーク |
| **サブネット** | ネットワークの分割（Public/Private） |
| **セキュリティグループ** | 通信の許可/拒否 |
| **ルートテーブル** | トラフィックの経路 |
| **VPCエンドポイント** | AWSサービスへのプライベート接続 |

## 💬 考えてみよう

```
Q: データベースをPrivateサブネットに置く理由は何ですか？
Q: NATゲートウェイのコストを削減する方法は？
Q: セキュリティグループとネットワークACLの違いは何ですか？
```

## 🔗 次のコンテンツ

[ECS/Fargate基礎](13-cloud-practice-03.md)に進んでください。
