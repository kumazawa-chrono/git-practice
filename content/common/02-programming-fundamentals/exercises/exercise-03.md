# 課題3: 型を活用したアプリケーション

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | ⭐⭐⭐ |
| 所要時間 | 90分 |

## 🎯 目標

TypeScriptの型システムを活用して、型安全なTodoアプリケーションを作成する。

## 📝 課題内容

### タスク管理アプリケーション

以下の仕様でTodoアプリケーションを実装してください。

#### 型定義

```typescript
// ステータスはリテラル型で定義
type TodoStatus = "pending" | "in_progress" | "completed";

// 優先度
type Priority = "low" | "medium" | "high";

// Todo項目
interface Todo {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  priority: Priority;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  tags: string[];
}

// 作成時の入力（idと日付は自動生成）
type CreateTodoInput = Omit<Todo, "id" | "createdAt" | "updatedAt">;

// 更新時の入力（部分更新可能）
type UpdateTodoInput = Partial<Omit<Todo, "id" | "createdAt">>;

// フィルター条件
interface TodoFilter {
  status?: TodoStatus;
  priority?: Priority;
  tag?: string;
}
```

#### TodoManager クラスの実装

```typescript
class TodoManager {
  private todos: Todo[] = [];

  // Todo を作成
  create(input: CreateTodoInput): Todo {
    // idを生成（例: Date.now().toString()）
    // createdAt, updatedAt を設定
    // 実装
  }

  // ID で取得
  getById(id: string): Todo | undefined {
    // 実装
  }

  // すべて取得
  getAll(): Todo[] {
    // 実装
  }

  // フィルター付きで取得
  filter(filter: TodoFilter): Todo[] {
    // 実装
  }

  // Todo を更新
  update(id: string, input: UpdateTodoInput): Todo | undefined {
    // updatedAt を更新
    // 実装
  }

  // Todo を削除
  delete(id: string): boolean {
    // 実装
  }

  // ステータスでグループ化
  groupByStatus(): Record<TodoStatus, Todo[]> {
    // 実装
  }

  // 期限切れの Todo を取得
  getOverdue(): Todo[] {
    // dueDate が現在より前のもの
    // 実装
  }

  // 統計情報を取得
  getStats(): {
    total: number;
    byStatus: Record<TodoStatus, number>;
    byPriority: Record<Priority, number>;
    overdue: number;
  } {
    // 実装
  }
}
```

#### テストコード

```typescript
const manager = new TodoManager();

// 作成
const todo1 = manager.create({
  title: "TypeScriptを学ぶ",
  description: "基礎から応用まで",
  status: "in_progress",
  priority: "high",
  tags: ["学習", "プログラミング"],
  dueDate: new Date("2024-12-31"),
});

const todo2 = manager.create({
  title: "買い物に行く",
  status: "pending",
  priority: "low",
  tags: ["日常"],
});

const todo3 = manager.create({
  title: "レポートを書く",
  status: "pending",
  priority: "high",
  tags: ["仕事"],
  dueDate: new Date("2024-01-01"), // 期限切れ
});

// フィルター
console.log(manager.filter({ status: "pending" }));
console.log(manager.filter({ priority: "high" }));
console.log(manager.filter({ tag: "学習" }));

// 更新
manager.update(todo1.id, { status: "completed" });

// グループ化
console.log(manager.groupByStatus());

// 期限切れ
console.log(manager.getOverdue());

// 統計
console.log(manager.getStats());
```

## 💡 ヒント

<details>
<summary>groupByStatus のヒント</summary>

```typescript
groupByStatus(): Record<TodoStatus, Todo[]> {
  return this.todos.reduce((acc, todo) => {
    const status = todo.status;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(todo);
    return acc;
  }, {} as Record<TodoStatus, Todo[]>);
}
```

</details>

<details>
<summary>filter のヒント</summary>

```typescript
filter(filter: TodoFilter): Todo[] {
  return this.todos.filter(todo => {
    if (filter.status && todo.status !== filter.status) return false;
    if (filter.priority && todo.priority !== filter.priority) return false;
    if (filter.tag && !todo.tags.includes(filter.tag)) return false;
    return true;
  });
}
```

</details>

## ✅ 完了条件

- [ ] すべてのメソッドが正しく動作する
- [ ] 型エラーがない
- [ ] ユーティリティ型（Omit, Partial, Record）を活用している

## 📤 提出物

- 作成したTypeScriptファイル（`exercise-03.ts`）
