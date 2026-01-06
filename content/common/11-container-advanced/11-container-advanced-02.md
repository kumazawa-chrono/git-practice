# 仮想化技術理論

## 📋 概要

| 項目 | 内容 |
|------|------|
| 所要時間 | 45分 |
| 難易度 | [中級] |
| 前提知識 | OS・プロセス基礎 |

## 🎯 なぜこれを学ぶのか

仮想化技術の歴史と種類を理解することで、コンテナの位置づけが明確になります。

```mermaid
timeline
    title 仮想化技術の進化
    1960s : メインフレーム仮想化
    1990s : ハイパーバイザー登場
    2000s : VMware普及
    2013 : Docker登場
    2015 : Kubernetes登場
```

## 📚 学習内容

### 1. 仮想化の種類

#### 1.1 仮想化技術の分類

```mermaid
flowchart TB
    subgraph type1[Type 1: ハイパーバイザー型]
        H1[ハードウェア]
        HV1[ハイパーバイザー]
        VM1[VM]
        VM2[VM]
        H1 --> HV1
        HV1 --> VM1
        HV1 --> VM2
    end
    
    subgraph type2[Type 2: ホスト型]
        H2[ハードウェア]
        OS2[ホストOS]
        HV2[仮想化ソフト]
        VM3[VM]
        H2 --> OS2
        OS2 --> HV2
        HV2 --> VM3
    end
    
    subgraph container[コンテナ型]
        H3[ハードウェア]
        OS3[ホストOS]
        D[コンテナランタイム]
        C1[コンテナ]
        C2[コンテナ]
        H3 --> OS3
        OS3 --> D
        D --> C1
        D --> C2
    end
```

| 種類 | 例 | 特徴 |
|------|-----|------|
| **Type 1** | VMware ESXi, Hyper-V | ハードウェア上で直接動作 |
| **Type 2** | VirtualBox, VMware Workstation | ホストOS上で動作 |
| **コンテナ** | Docker, containerd | カーネルを共有 |

### 2. 仮想マシン vs コンテナ

#### 2.1 アーキテクチャの違い

```mermaid
flowchart TB
    subgraph vm[仮想マシン]
        direction TB
        VH[ハードウェア]
        VHV[ハイパーバイザー]
        subgraph vm1[VM1]
            VOS1[ゲストOS]
            VA1[アプリ]
        end
        subgraph vm2[VM2]
            VOS2[ゲストOS]
            VA2[アプリ]
        end
        VH --> VHV
        VHV --> vm1
        VHV --> vm2
    end
    
    subgraph cont[コンテナ]
        direction TB
        CH[ハードウェア]
        COS[ホストOS]
        CD[コンテナランタイム]
        subgraph c1[コンテナ1]
            CA1[アプリ]
        end
        subgraph c2[コンテナ2]
            CA2[アプリ]
        end
        CH --> COS
        COS --> CD
        CD --> c1
        CD --> c2
    end
```

#### 2.2 比較表

| 項目 | 仮想マシン | コンテナ |
|------|-----------|---------|
| **起動時間** | 分単位 | 秒単位 |
| **サイズ** | GB単位 | MB単位 |
| **オーバーヘッド** | 大きい（ゲストOS） | 小さい |
| **分離レベル** | 強い（ハードウェアレベル） | 中程度（カーネル共有） |
| **密度** | 低い（1台に数十VM） | 高い（1台に数百コンテナ） |

#### 2.3 使い分け

```mermaid
flowchart TD
    A[要件] --> B{分離レベル}
    B -->|強い分離が必要| C[仮想マシン]
    B -->|アプリ分離で十分| D[コンテナ]
    
    A --> E{リソース効率}
    E -->|効率重視| D
    E -->|安定性重視| C
    
    A --> F{起動速度}
    F -->|高速起動が必要| D
    F -->|起動速度は重要でない| C
```

| ユースケース | 推奨 |
|-------------|------|
| マルチテナント（顧客ごとに分離） | VM |
| マイクロサービス | コンテナ |
| 開発環境 | コンテナ |
| レガシーアプリ | VM |
| CI/CD | コンテナ |

### 3. コンテナランタイム

#### 3.1 コンテナランタイムの階層

```mermaid
flowchart TB
    subgraph high[高レベルランタイム]
        Docker[Docker]
        Podman[Podman]
    end
    
    subgraph low[低レベルランタイム]
        containerd[containerd]
        CRI-O[CRI-O]
    end
    
    subgraph oci[OCIランタイム]
        runc[runc]
    end
    
    Docker --> containerd
    Podman --> CRI-O
    containerd --> runc
    CRI-O --> runc
```

| レベル | 役割 | 例 |
|--------|------|-----|
| **高レベル** | ユーザーインターフェース、イメージ管理 | Docker, Podman |
| **低レベル** | コンテナライフサイクル管理 | containerd, CRI-O |
| **OCI** | 実際のコンテナ作成・実行 | runc |

#### 3.2 Docker以外の選択肢

| ツール | 特徴 |
|--------|------|
| **Podman** | デーモンレス、rootless、Docker互換 |
| **containerd** | Kubernetes標準、軽量 |
| **CRI-O** | Kubernetes専用、軽量 |

### 4. コンテナイメージの仕組み

#### 4.1 レイヤー構造

```mermaid
flowchart TB
    subgraph image[イメージ レイヤー構造]
        direction TB
        L1[ベースイメージ<br/>ubuntu:22.04]
        L2[apt install nodejs]
        L3[npm install]
        L4[COPY app.js]
        L1 --> L2 --> L3 --> L4
    end
    
    subgraph container[コンテナ]
        CL[書き込み可能レイヤー]
        image --> CL
    end
```

**特徴**:
- 各命令が1つのレイヤーになる
- レイヤーは読み取り専用
- コンテナ起動時に書き込み可能レイヤーを追加
- レイヤーは再利用される（キャッシュ）

#### 4.2 Copy-on-Write

```mermaid
flowchart LR
    subgraph before[書き込み前]
        I1[イメージレイヤー<br/>file.txt]
        C1[コンテナレイヤー<br/>空]
    end
    
    subgraph after[書き込み後]
        I2[イメージレイヤー<br/>file.txt]
        C2[コンテナレイヤー<br/>file.txt コピー]
    end
    
    before -->|ファイル変更| after
```

- **読み取り**: イメージレイヤーから直接読む
- **書き込み**: コンテナレイヤーにコピーしてから変更

### 5. コンテナネットワーク

#### 5.1 ネットワークモード

```mermaid
flowchart TB
    subgraph bridge[bridge モード]
        B1[docker0 bridge]
        BC1[コンテナ1<br/>172.17.0.2]
        BC2[コンテナ2<br/>172.17.0.3]
        B1 --- BC1
        B1 --- BC2
    end
    
    subgraph host[host モード]
        HN[ホストネットワーク]
        HC[コンテナ<br/>ホストと同じIP]
        HN --- HC
    end
    
    subgraph none[none モード]
        NC[コンテナ<br/>ネットワークなし]
    end
```

| モード | 説明 | ユースケース |
|--------|------|-------------|
| **bridge** | 仮想ブリッジ経由（デフォルト） | 一般的な用途 |
| **host** | ホストのネットワークを共有 | パフォーマンス重視 |
| **none** | ネットワークなし | セキュリティ |
| **overlay** | 複数ホスト間でネットワーク | Swarm/Kubernetes |

#### 5.2 ポートマッピング

```mermaid
flowchart LR
    U[ユーザー] -->|localhost:8080| H[ホスト:8080]
    H -->|NAT| C[コンテナ:80]
```

```bash
# ホストの8080をコンテナの80にマッピング
docker run -p 8080:80 nginx
```

### 6. コンテナストレージ

#### 6.1 ストレージの種類

```mermaid
flowchart TB
    subgraph volume[Volume]
        V[/var/lib/docker/volumes/]
        VC[コンテナ]
        V <--> VC
    end
    
    subgraph bind[Bind Mount]
        B[ホストの任意のパス]
        BC[コンテナ]
        B <--> BC
    end
    
    subgraph tmpfs[tmpfs]
        T[メモリ]
        TC[コンテナ]
        T <--> TC
    end
```

| 種類 | 説明 | ユースケース |
|------|------|-------------|
| **Volume** | Dockerが管理 | データ永続化（推奨） |
| **Bind Mount** | ホストのディレクトリをマウント | 開発時のコード共有 |
| **tmpfs** | メモリ上 | 一時データ |

## ✅ まとめ

| 概念 | 説明 |
|------|------|
| **VM vs コンテナ** | VMは完全分離、コンテナは軽量で高速 |
| **コンテナランタイム** | Docker, containerd, runc の階層構造 |
| **イメージ** | レイヤー構造、Copy-on-Write |
| **ネットワーク** | bridge, host, none, overlay |
| **ストレージ** | Volume, Bind Mount, tmpfs |

## 💬 考えてみよう

```
Q: セキュリティが最重要な場面では、VMとコンテナどちらを選びますか？
Q: イメージのレイヤーを少なくするメリットは何ですか？
Q: 開発時と本番でストレージの種類を変える理由は何ですか？
```

## 🔗 次のコンテンツ

[Docker Compose基礎](11-container-advanced-03.md)に進んでください。

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../docs/terms-of-use.md)をご覧ください。
