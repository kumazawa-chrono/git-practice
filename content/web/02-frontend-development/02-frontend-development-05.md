# 状態管理

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [中級] |
| 所要時間 | 1-2時間 |
| 前提知識 | React Hooks |

## なぜ学ぶ必要があるのか

### 状態管理が解決する問題

コンポーネント間で状態を共有する必要がある場合、Propsだけでは複雑になります。状態管理ライブラリを使うことで、グローバルな状態を管理できます。

## 状態管理の選択

### 1. Context API（組み込み）

```typescript
import { createContext, useContext, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

### 2. Zustand（軽量）

```typescript
import { create } from 'zustand';

interface Store {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

// 使用
function Counter() {
  const { count, increment, decrement } = useStore();
  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

### 3. Redux（大規模向け）

```typescript
import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});
```

## 選択の指針

| ライブラリ | 用途 | 複雑さ |
|-----------|------|--------|
| **Context API** | 小規模な状態共有 | 低 |
| **Zustand** | 中規模の状態管理 | 中 |
| **Redux** | 大規模アプリケーション | 高 |

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] Context APIで状態を共有できる
- [ ] Zustandで状態管理ができる
- [ ] 状態管理ライブラリを選択できる

## 次のステップ

- [06. フロントエンドテスト](02-frontend-development-06.md)

## 参考リソース

- [Zustand公式ドキュメント](https://zustand-demo.pmnd.rs/)
- [Redux公式ドキュメント](https://redux.js.org/)

---

**著作権表示**

Copyright © 2024 Honeycome Inc. All rights reserved.

本コンテンツは、Honeycome Inc.の所有物です。無断での複製、配布、転載を禁止します。
詳細は[利用規約](../../docs/terms-of-use.md)をご覧ください。
