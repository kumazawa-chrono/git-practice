# 課題3: 仕様から実装

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐⭐⭐ |
| 所要時間 | 60分 |

## 🎯 目標

仕様書から実際のコードを実装する。

## 📝 課題内容

### 仕様書

```markdown
# タスク管理API

## 概要
シンプルなタスク管理システムのAPI

## 機能要件

### タスク作成
- POST /api/tasks
- リクエスト: { title: string, description?: string, dueDate?: string }
- title: 1-100文字、必須
- description: 0-1000文字、任意
- dueDate: ISO8601形式、任意、過去日付は不可
- レスポンス: 201 + 作成されたタスク

### タスク一覧取得
- GET /api/tasks
- クエリパラメータ:
  - status: "pending" | "completed" | "all" (デフォルト: all)
  - sort: "createdAt" | "dueDate" (デフォルト: createdAt)
  - order: "asc" | "desc" (デフォルト: desc)
- レスポンス: 200 + タスク配列

### タスク更新
- PATCH /api/tasks/:id
- リクエスト: { title?, description?, dueDate?, status? }
- status: "pending" | "completed"
- レスポンス: 200 + 更新されたタスク
- 存在しない場合: 404

### タスク削除
- DELETE /api/tasks/:id
- レスポンス: 204
- 存在しない場合: 404

## データモデル
- id: UUID
- title: string
- description: string | null
- status: "pending" | "completed"
- dueDate: Date | null
- createdAt: Date
- updatedAt: Date
```

### 実装タスク

#### Task 1: 型定義

`types/task.ts`を作成し、必要な型を定義してください。

#### Task 2: バリデーション

`validators/taskValidator.ts`を作成し、zodスキーマを定義してください。

#### Task 3: サービス層

`services/taskService.ts`を作成し、CRUD操作を実装してください（メモリ上でOK）。

#### Task 4: ルーティング

`routes/taskRoutes.ts`を作成し、APIエンドポイントを実装してください。

#### Task 5: テスト

`__tests__/taskApi.test.ts`を作成し、各エンドポイントのテストを書いてください。

### 期待する構成

```
src/
├── types/
│   └── task.ts
├── validators/
│   └── taskValidator.ts
├── services/
│   └── taskService.ts
├── routes/
│   └── taskRoutes.ts
└── __tests__/
    └── taskApi.test.ts
```

## 💡 ヒント

- zodの日付バリデーションには`z.coerce.date()`が便利
- 過去日付チェックには`.refine()`を使用
- テストではsupertest + vitestを使用

## ✅ 完了条件

- [ ] 型定義が仕様通り
- [ ] バリデーションが仕様の制約を満たす
- [ ] すべてのAPIが仕様通りに動作
- [ ] テストがすべてパス
