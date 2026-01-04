# 02. プログラミング基礎（TypeScript） - 理解度チェックテスト

## 📋 テストについて

| 項目 | 内容 |
|------|------|
| 問題数 | 15問 |
| 目安時間 | 15分 |
| 合格ライン | 12問以上正解（80%） |

---

## 問題

### 【基本構文】

#### Q1. 変数宣言で推奨されるのはどれですか？

- A) `var`を使う
- B) 基本は`let`、変更しない場合は`const`
- C) 基本は`const`、再代入が必要な場合のみ`let`
- D) すべて`var`で統一

<details>
<summary>回答と解説</summary>

**正解: C**

`const`を基本とし、再代入が必要な場合のみ`let`を使います。`var`はスコープの問題があるため避けます。

</details>

---

#### Q2. 次のコードの出力は何ですか？

```typescript
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
```

- A) エラーになる
- B) `[1, 2, 3]`
- C) `[1, 2, 3, 4]`
- D) `[4]`

<details>
<summary>回答と解説</summary>

**正解: C**

`const`は再代入を禁止しますが、配列の中身の変更は可能です。`arr = [5]`はエラーになりますが、`arr.push(4)`は許可されます。

</details>

---

#### Q3. `===`と`==`の違いとして正しいものはどれですか？

- A) 同じ動作
- B) `===`は型も比較、`==`は型変換後に比較
- C) `==`の方が厳密
- D) `===`は数値専用

<details>
<summary>回答と解説</summary>

**正解: B**

`===`は厳密等価演算子で型も比較します。`==`は型変換を行うため、`1 == "1"`はtrueになりますが、`1 === "1"`はfalseです。

</details>

---

### 【配列操作】

#### Q4. `map`と`forEach`の違いとして正しいものはどれですか？

- A) 同じ動作
- B) `map`は新しい配列を返す、`forEach`は返さない
- C) `forEach`は新しい配列を返す、`map`は返さない
- D) `map`は要素を削除できる

<details>
<summary>回答と解説</summary>

**正解: B**

`map`は各要素を変換した新しい配列を返します。`forEach`は単に繰り返し処理を行い、戻り値はありません。

</details>

---

#### Q5. 次のコードの結果は何ですか？

```typescript
const numbers = [1, 2, 3, 4, 5];
const result = numbers.filter(n => n % 2 === 0).map(n => n * 2);
```

- A) `[2, 4, 6, 8, 10]`
- B) `[4, 8]`
- C) `[2, 4]`
- D) `[1, 2, 3, 4, 5]`

<details>
<summary>回答と解説</summary>

**正解: B**

`filter(n => n % 2 === 0)`で偶数`[2, 4]`を抽出し、`map(n => n * 2)`で2倍して`[4, 8]`になります。

</details>

---

### 【関数】

#### Q6. アロー関数の特徴として正しいものはどれですか？

- A) `function`キーワードが必要
- B) `this`の束縛が異なる
- C) 引数を取れない
- D) 非同期処理専用

<details>
<summary>回答と解説</summary>

**正解: B**

アロー関数は`this`を外側のスコープから継承します。通常の関数は呼び出し時に`this`が決まります。

</details>

---

#### Q7. オプショナル引数の正しい書き方はどれですか？

- A) `function greet(name: string, greeting: string?)`
- B) `function greet(name: string, greeting?: string)`
- C) `function greet(name: string, greeting: optional string)`
- D) `function greet(name: string, [greeting: string])`

<details>
<summary>回答と解説</summary>

**正解: B**

TypeScriptでは`?`を引数名の後に付けてオプショナル引数を定義します。

</details>

---

### 【クラスとオブジェクト指向】

#### Q8. `private`アクセス修飾子の意味として正しいものはどれですか？

- A) どこからでもアクセス可能
- B) サブクラスからのみアクセス可能
- C) クラス内からのみアクセス可能
- D) 読み取り専用

<details>
<summary>回答と解説</summary>

**正解: C**

`private`はそのクラス内からのみアクセス可能です。`protected`はサブクラスからもアクセス可能、`public`はどこからでもアクセス可能です。

</details>

---

#### Q9. インターフェースとクラスの違いとして正しいものはどれですか？

- A) 同じもの
- B) インターフェースは型定義のみ、クラスは実装を含む
- C) クラスは型定義のみ
- D) インターフェースはJavaScriptに出力される

<details>
<summary>回答と解説</summary>

**正解: B**

インターフェースは型の「形」を定義するのみで実装を含みません。クラスは実装を含み、インスタンス化できます。インターフェースはコンパイル後のJavaScriptには含まれません。

</details>

---

### 【型システム】

#### Q10. ユニオン型の意味として正しいものはどれですか？

- A) 複数の型のすべてを満たす
- B) 複数の型のいずれかを許容する
- C) 型を無視する
- D) 配列の型

<details>
<summary>回答と解説</summary>

**正解: B**

ユニオン型（`A | B`）は、Aの型またはBの型のいずれかを許容します。

</details>

---

#### Q11. 次のコードの`result`の型は何ですか？

```typescript
function getValue(flag: boolean) {
  return flag ? "hello" : 42;
}
const result = getValue(true);
```

- A) `string`
- B) `number`
- C) `string | number`
- D) `any`

<details>
<summary>回答と解説</summary>

**正解: C**

関数が文字列または数値を返す可能性があるため、戻り値の型は`string | number`と推論されます。

</details>

---

#### Q12. `Partial<T>`ユーティリティ型の説明として正しいものはどれですか？

- A) Tの全プロパティを必須にする
- B) Tの全プロパティをオプショナルにする
- C) Tから一部のプロパティを除外する
- D) Tを読み取り専用にする

<details>
<summary>回答と解説</summary>

**正解: B**

`Partial<T>`はTのすべてのプロパティをオプショナル（?付き）にします。

</details>

---

### 【エラーハンドリング】

#### Q13. `try-catch`文でエラーを捕捉した後、すべきこととして最も適切なものはどれですか？

- A) 何もしない
- B) エラーを適切に処理（ログ出力、ユーザー通知など）
- C) プログラムを終了
- D) エラーを無視する

<details>
<summary>回答と解説</summary>

**正解: B**

エラーは適切に処理（ログ出力、ユーザーへの通知、再スローなど）すべきです。空のcatchブロックはバグの原因になります。

</details>

---

#### Q14. `async/await`と`try-catch`の組み合わせとして正しいものはどれですか？

- A) `await`は`try`ブロックの外でのみ使用
- B) `async`関数内で`try-catch`と`await`を組み合わせて使う
- C) `async`関数では`try-catch`を使えない
- D) `await`でエラーは発生しない

<details>
<summary>回答と解説</summary>

**正解: B**

`async`関数内で`await`した処理のエラーは`try-catch`でキャッチできます。

</details>

---

#### Q15. 次のコードの問題点は何ですか？

```typescript
const user = getUser(id);
console.log(user.name);
```

- A) 問題なし
- B) `getUser`が`undefined`を返す可能性があり、エラーになる
- C) `console.log`の引数が間違っている
- D) `id`が定義されていない

<details>
<summary>回答と解説</summary>

**正解: B**

`getUser`が`undefined`を返す場合、`user.name`で「Cannot read property 'name' of undefined」エラーが発生します。`if (user)`でチェックするか、`user?.name`を使うべきです。

</details>

---

## 📊 結果

| 正解数 | 判定 | アドバイス |
|:------:|:----:|-----------|
| 12-15問 | ✅ 合格 | 次のカテゴリに進んでください |
| 9-11問 | ⚠️ 惜しい | 間違えた箇所を復習してください |
| 8問以下 | ❌ 要復習 | コンテンツを読み直してください |
