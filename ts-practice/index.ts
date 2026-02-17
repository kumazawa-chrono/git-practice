// 1. 数値配列の合計を返す
function sum(numbers: number[]): number {
  // 実装
}

// 2. 数値配列の平均を返す
function average(numbers: number[]): number {
  // 実装
}

// 3. 数値配列から最大値を返す
function max(numbers: number[]): number {
  // 実装
}

// 4. 数値配列から偶数のみを返す
function filterEven(numbers: number[]): number[] {
  // 実装
}

console.log(sum([1, 2, 3, 4, 5]));       // 15
console.log(average([1, 2, 3, 4, 5]));   // 3
console.log(max([1, 5, 3, 2, 4]));       // 5
console.log(filterEven([1, 2, 3, 4, 5])); // [2, 4]

//1.文字列を逆順にする
function reverse(str:string): string {
    //実装
}

//2.文字列が回文かどうかを判定
function inPalidrome(str:string): boolean {
    //実装(大文字小文字を区別しない)
}

//3.文字列内の単語数をカウント
function countWords(str: string): number {
    //実装
}

console.log(reverse("hello"));           //"olleh"
console.log(inPalidrome("Rececar"));     //"true"
console.log(inPalidrome("Hello"));      //"false"
console.log(countWords("Hello World"));   //2

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
}


const products: Product[] = [
    { id: 1, name:"Aplle", price: 100,category:"fruit" },
    { id: 2, name:"banana", price: 80, category: "fruit" },
    { id: 3, name: "Carrot", price: 50,category: "vegetable" },
    { id: 4, name:"Milk", price:200,category: "dairy" },
];


//1.カテゴリで絞り込む
function filterByCategory(priducts: Product[], category: string): Product[]{
    //実装
}

//2.合計金額を計算
function calculateTotal(products: Product[]): number {
    //実装
}

//3.最も高い商品を取得
function getMostExpensive(products: Product[]): Product | undefined {
    //実装
}