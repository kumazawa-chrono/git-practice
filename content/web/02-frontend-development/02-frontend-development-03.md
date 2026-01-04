# React Hooks

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [中級] |
| 所要時間 | 1-2時間 |
| 前提知識 | React基礎 |

## なぜ学ぶ必要があるのか

### Hooksが解決する問題

Hooks以前は、クラスコンポーネントでしか状態管理やライフサイクルが使えませんでした。Hooksにより、関数コンポーネントでもこれらが使えるようになりました。

## 主要なHooks

### useState

```typescript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### useEffect

```typescript
import { useEffect, useState } from 'react';

function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // マウント時とuserId変更時に実行
    fetchUser(userId).then(setUser);
  }, [userId]);

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}
```

### useCallback

```typescript
import { useCallback, useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback((text: string) => {
    setTodos(prev => [...prev, { id: Date.now(), text }]);
  }, []);

  return <TodoForm onAdd={addTodo} />;
}
```

### useMemo

```typescript
import { useMemo } from 'react';

function ExpensiveComponent({ items }: { items: Item[] }) {
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.price - b.price);
  }, [items]);

  return <ItemList items={sortedItems} />;
}
```

### カスタムフック

```typescript
function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// 使用
function Counter() {
  const { count, increment, decrement } = useCounter(0);
  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] useStateで状態管理ができる
- [ ] useEffectで副作用を扱える
- [ ] useCallbackとuseMemoを適切に使える
- [ ] カスタムフックを作成できる

## 次のステップ

- [04. Next.js](02-frontend-development-04.md)

## 参考リソース

- [React Hooks公式ドキュメント](https://ja.react.dev/reference/react)
