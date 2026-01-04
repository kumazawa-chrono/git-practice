# 課題1: SQL基本操作

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐ |
| 所要時間 | 45分 |

## 🎯 目標

基本的なSQLクエリ（SELECT, INSERT, UPDATE, DELETE）を練習する。

## 📝 課題内容

### 準備：テーブルの作成

```sql
-- usersテーブル
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  age INTEGER,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- サンプルデータ
INSERT INTO users (name, email, age) VALUES 
  ('Alice', 'alice@example.com', 25),
  ('Bob', 'bob@example.com', 30),
  ('Carol', 'carol@example.com', 28),
  ('Dave', 'dave@example.com', 35),
  ('Eve', 'eve@example.com', 22);
```

### 課題1-1: SELECT

以下のクエリを書いてください。

1. すべてのユーザーを取得
2. 名前とメールアドレスのみ取得
3. 25歳以上のユーザーを取得
4. 年齢で昇順に並び替えて取得
5. 最も若いユーザー3人を取得

### 課題1-2: INSERT

以下の操作を行ってください。

1. 新しいユーザー "Frank" (frank@example.com, 27歳) を追加
2. 複数のユーザーを一度に追加:
   - "Grace" (grace@example.com, 29歳)
   - "Henry" (henry@example.com, 31歳)

### 課題1-3: UPDATE

以下の操作を行ってください。

1. Aliceの年齢を26歳に更新
2. メールアドレスが "bob@example.com" のユーザーの名前を "Robert" に変更
3. 30歳以上のユーザー全員の年齢を1歳増やす

### 課題1-4: DELETE

以下の操作を行ってください。

1. id = 1 のユーザーを削除
2. 年齢が20歳未満のユーザーを削除（該当者がいなくてもOK）

### 課題1-5: WHERE句の練習

以下の条件でユーザーを取得してください。

1. 年齢が25歳以上30歳以下
2. 名前が "A" で始まる
3. メールアドレスに "example" が含まれる
4. 年齢が25, 28, 30のいずれか

## ✅ 完了条件

- [ ] すべてのクエリが正しく動作する
- [ ] 各クエリの結果を確認している

## 📤 提出物

- 作成したSQLクエリ（`exercise-01.sql`）
- 各クエリの実行結果（スクリーンショットまたはテキスト）
