# 課題1: 基本ワークフロー

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐ |
| 所要時間 | 30分 |

## 🎯 目標

GitHub Actionsの基本的なワークフローを作成する。

## 📝 課題内容

### 課題1-1: Hello World

`.github/workflows/hello.yml`を作成:

```yaml
name: Hello World

on: [push]

jobs:
  hello:
    runs-on: ubuntu-latest
    steps:
      - name: Say Hello
        run: echo "Hello, World!"
      
      - name: Show date
        run: date
      
      - name: Show runner info
        run: |
          echo "OS: $RUNNER_OS"
          echo "Arch: $RUNNER_ARCH"
```

### 課題1-2: チェックアウトとNode.js

```yaml
name: Node.js Check

on: [push]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Show versions
        run: |
          node --version
          npm --version
      
      - name: List files
        run: ls -la
```

### 課題1-3: 環境変数

```yaml
name: Environment Variables

on: [push]

env:
  GREETING: Hello

jobs:
  demo:
    runs-on: ubuntu-latest
    env:
      TARGET: World
    steps:
      - name: Use env vars
        run: echo "$GREETING, $TARGET!"
      
      - name: Step env
        run: echo "Branch: $BRANCH"
        env:
          BRANCH: ${{ github.ref_name }}
```

## ✅ 完了条件

- [ ] 3つのワークフローが正常に実行された
- [ ] Actionsタブで実行結果を確認した
