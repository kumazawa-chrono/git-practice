# フロントエンドテスト

## 📋 概要

| 項目 | 内容 |
|------|------|
| 難易度 | [中級] |
| 所要時間 | 1-2時間 |
| 前提知識 | React基礎、テスト基礎 |

## なぜ学ぶ必要があるのか

### テストが解決する問題

- **リグレッション防止**: 変更による既存機能の破壊を防ぐ
- **リファクタリングの安全性**: テストがあれば安全にリファクタリングできる
- **ドキュメントとしての役割**: テストが仕様を説明する

## Jest

### セットアップ

```bash
npm install -D jest @types/jest ts-jest
```

### 基本的なテスト

```typescript
// utils.test.ts
import { add } from './utils';

describe('add', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });
});
```

## React Testing Library

### セットアップ

```bash
npm install -D @testing-library/react @testing-library/jest-dom
```

### コンポーネントのテスト

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render with label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click" onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 学習目標の確認

このコンテンツを読んだ後、以下ができるようになっているはずです：

- [ ] Jestで基本的なテストを書ける
- [ ] React Testing Libraryでコンポーネントをテストできる
- [ ] テストのベストプラクティスを理解している

## 次のステップ

- [03. バックエンド開発](../03-backend-development/)

## 参考リソース

- [Jest公式ドキュメント](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
