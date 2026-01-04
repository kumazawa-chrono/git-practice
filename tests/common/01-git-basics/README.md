# 01. Git基礎 - 理解度チェックテスト

## 📋 テストについて

| 項目 | 内容 |
|------|------|
| 問題数 | 15問 |
| 目安時間 | 15分 |
| 合格ライン | 12問以上正解（80%） |
| 形式 | 自動採点可能 |

## 🚀 実行方法

### 方法1: Node.jsで実行

```bash
cd tests/common/01-git-basics
npm install
npm test
```

### 方法2: 手動で回答

`quiz.md`を開いて回答し、`answers.json`に記入してください。

```bash
# 回答を記入
cat > answers.json << EOF
{
  "q1": "B",
  "q2": "B",
  ...
}
EOF

# 採点
npm run grade
```

## 📝 問題

詳細は [content/common/01-git-basics/quiz.md](../../../content/common/01-git-basics/quiz.md) を参照してください。

## ✅ 結果

- ✅ **12-15問正解**: 合格！次のカテゴリに進んでください
- ⚠️ **9-11問正解**: 惜しい！間違えた箇所を復習してください
- ❌ **8問以下**: 要復習。コンテンツを読み直してください
