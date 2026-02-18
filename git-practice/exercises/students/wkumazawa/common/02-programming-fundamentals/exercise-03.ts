//3－3　Todoアプリの作成

type TodoStatus = "pending" | "in_progress" | "completed";
type Priority = "low" | "medium" |"high";

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

type CreateTodoInput = Omit<Todo, "id" |"createdAt" | "updatedAt">;
type UpdateTodoInput = Partial<Omit<Todo, "id" | "createdAt">>;

interface TodoFilter {
    status?: TodoStatus;
    priority?: Priority;
    tag?: string;
}


//2.クラス実装
class TodoManager {
    private todos: Todo[] = [];

    //新規作成
    create(input: CreateTodoInput): Todo {
        const now = new Date();
        const newTodo: Todo = {
            ...input,
            id:Math.random().toString(36).substring(2, 9), //ランダムなID
            createdAt: now,
            updatedAt: now,
        };
        this.todos.push(newTodo);
        return newTodo;
    }

    //ID検索
    getById(id: string): Todo | undefined {
        return this.todos.find(t => t.id === id);
    }

    //フィルタリング
    filter(f: TodoFilter): Todo[] {
        return this.todos.filter(t => {
            const statusMatch = !f.status || t.status === f.status;
            const priorityMatch = !f.priority || t.priority ===f.priority;
            const tagMatch = !f.tag || t.tags.includes(f.tag);
            return statusMatch && priorityMatch && tagMatch; 
        });
    }

    //更新
    update(id: string, input: UpdateTodoInput): Todo | undefined {
        const todo = this.getById(id);
        if (!todo)return undefined;

        Object.assign(todo, input);
        todo.updatedAt = new Date();
        return todo;
    }

    //統計
    getStats() {
        return {
            total: this.todos.length,
            overdue: this.todos.filter(t => t.dueDate && t.dueDate < new Date() && t.status !=="completed").length
        };
    }
}

//テスト実行
const manager = new TodoManager();

const task = manager.create({
    title: "todoアプリ作成の課題",
    description: "TodoManagerを動かす",
    status: "pending",
    priority: "high",
    tags: ["final-step"],
    dueDate: new Date("2026-02-18")
});

console.log("作成されたタスク:", task.title);
manager.update(task.id, {status: "in_progress" });
console.log("更新後のステータス:", manager.getById(task.id)?.status);
console.log("統計:", manager.getStats());