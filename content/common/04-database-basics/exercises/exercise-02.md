# 課題2: JOINと集計

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐⭐ |
| 所要時間 | 60分 |

## 🎯 目標

複数テーブルのJOINと集計関数を使いこなす。

## 📝 課題内容

### 準備：テーブルの作成

```sql
-- categoriesテーブル
CREATE TABLE categories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);

-- productsテーブル
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  category_id INTEGER,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- ordersテーブル
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  user_id INTEGER,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- order_itemsテーブル
CREATE TABLE order_items (
  id INTEGER PRIMARY KEY,
  order_id INTEGER,
  product_id INTEGER,
  quantity INTEGER,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- サンプルデータ
INSERT INTO categories (name) VALUES ('果物'), ('野菜'), ('乳製品');

INSERT INTO products (name, price, category_id) VALUES 
  ('りんご', 100, 1),
  ('バナナ', 80, 1),
  ('にんじん', 50, 2),
  ('牛乳', 200, 3),
  ('ヨーグルト', 150, 3);

INSERT INTO orders (user_id) VALUES (1), (2), (1), (3);

INSERT INTO order_items (order_id, product_id, quantity) VALUES 
  (1, 1, 3),
  (1, 2, 2),
  (2, 4, 1),
  (3, 1, 1),
  (3, 3, 5),
  (4, 5, 2);
```

### 課題2-1: INNER JOIN

1. 商品名とカテゴリ名を一覧で表示
2. 注文者の名前と注文日を表示
3. 注文詳細（注文ID、ユーザー名、商品名、数量）を表示

### 課題2-2: LEFT JOIN

1. すべてのカテゴリと、そのカテゴリに属する商品を表示（商品がないカテゴリも含む）
2. すべてのユーザーと注文数を表示（注文がないユーザーは0）

### 課題2-3: 集計

1. 商品の総数をカウント
2. 全商品の平均価格を算出
3. カテゴリごとの商品数を表示
4. カテゴリごとの平均価格を表示（高い順）
5. 2商品以上あるカテゴリのみ表示

### 課題2-4: 複合クエリ

1. 各注文の合計金額を算出
   - ヒント: 商品価格 × 数量 の合計

```sql
-- 期待する出力
| order_id | total_amount |
|----------|--------------|
| 1        | 460          |
| 2        | 200          |
| ...      | ...          |
```

2. ユーザーごとの購入総額を算出

3. 最も売れている商品トップ3を表示
   - 売れている = 注文された数量の合計

## ✅ 完了条件

- [ ] JOINを使ったクエリが書ける
- [ ] 集計関数とGROUP BYが使える
- [ ] HAVINGを使った絞り込みができる

## 📤 提出物

- 作成したSQLクエリ（`exercise-02.sql`）
- 各クエリの実行結果
