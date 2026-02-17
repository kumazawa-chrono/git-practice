//課題1－1　配列操作

//1.数値配列の合計を返す
function sum(numbers: number[]): number {
    let total = 0;
    for(const num of numbers) {
        total += num;
    }
    return total;
}

//2.数値配列の平均を返す
function average(numbers: number[]): number {
    const total = sum(numbers);
    return total / numbers.length;
}

//.3数値配列から最大値を返す
function max(numbers: number[]): number {
    //1.最初の数字を暫定チャンピオン(result)にする
    let result = numbers[0];

    //2.配列の数字を1つずつ順番に見ていく
    for (const num of numbers) {
        //3.もし今の数字(num)が暫定1位(result)より大きかったら
        if (num > result) {
            //暫定1位を書き換える
            result = num;
        }
    }
    return result;
}

//4.数値配列から偶数のみを返す
function filterEven(numbers: number[]): number[] {
    //1.偶数だけを入れるための新しい空の箱を用意
    const result: number[] = [];

    //2.元の数字を1つずつチェック
    for (const num of numbers) {
        //.3.もし２で割った余りが0(偶数)なら
        if (num % 2 === 0) {
            //4.新しい加護に追加
            result.push(num);
        }
    }
    //5.最後に偶数が入ったかごを返す
    return result;
}

console.log(sum([1,2,3,4,5]));

console.log(average([1,2,3,4,5]));

console.log(max([1,5,2,4,3]));

console.log(filterEven([1,2,3,4,5,6]));


//課題1－2:文字列操作

//1.文字列を逆順にする
function reverse(str: string): string {
    //1.さかさまにした文字を入れるための空っぽの文字列
    let result ="";

    //2.文字列の最後から最初に向かって一文字ずつ取り出す
    for (const char of str) {
        //3.今までの結果の前に新しい文字をくっつける
        //これで順番が入れ替わる
        result = char + result;
    }
    return result;
}

//2.文字列か下位文化どうかを判定
function isPalindrome(str: string): boolean {
    //1.全部小文字に変換する(大文字小文字を無視するため)
    const lowerStr = str.toLowerCase();

    //2.文字をさかさまにする
    const reversedStr = reverse(lowerStr);

    //3.元の小文字と逆さまが同じなら true 違えば false
    return lowerStr === reversedStr;
}

//3.文字列内の単語数をカウント
function countWords(str: string): number {
   //1.文字列が空っぽ("")の場合は、単語は0
   if (str.trim() === "") {
    return 0 ;
   } 

   //2.スペース""で区切って配列に分ける
   //例："Hello world" -> ["HEllo", "world"]
   const words =str.trim().split(/\s+/);

   //3.その配列の長さ(個数)を返す
   return words.length;
}


console.log(reverse("hello"));  //"olleh"

console.log(isPalindrome("Racecar")); //true

console.log(isPalindrome("Hello")); //false

console.log(countWords("Hello World")); //2


//課題1－3:オブジェクト操作

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
}

const products: Product[] = [
    { id: 1, name: "Apple", price: 100, category: "fruit" },
    { id: 2, name: "Banana", price: 80, category: "fruit" },
    { id: 3, name: "Carrot", price: 50, category: "vegetable" },
    { id: 4, name: "Milk", price: 200, category: "dairy" },
];

//1.カテゴリで絞り込む
function filterByCategory(products: Product[], category: string): Product[] {
    //絞り込んだ商品を入れるための新しい空の配列を作る
    const result: Product[] = [];

    //2.productsの中身を1つずつチェックする
    for (const product of products) {
        //3.もし商品のカテゴリが探しているカテゴリ(category)と一致したら
        if (product.category === category) {
            //4.新しい配列(result)に追加する
            result.push(product);
        }
    }
    //5.最後にたまった配列を返す
    return result;
}

//2.合計金額を計算
function calculateTotal(products: Product[]): number {
    //1.合計を入れるための変数を用意
    let total = 0;

    //2.商品を一つずつみていく
    for (const product of products) {
        //3.商品の価格(price)を合計に足していく
        total = total + product.price;
    }
    //4.最後に合計金額を返す
    return total;
}

//3.最も高い商品を取得
function getMostExpensive(product: Product[]): Product | undefined {
    //0.配列が空っぽの場合はundefined(見つからない)を返す
    if(products.length === 0) return undefined;

    //1.最初の商品を暫定チャンピオンにする
    let expensiveProduct = products[0];

    //2.商品を一つずつ順番に見ていく
    for (const product of products) {
        //3.もし今の商品の価格が暫定1位の価格より高かったら
        if (product.price > expensiveProduct.price) {
            //暫定1位の商品を入れ替える
            expensiveProduct = product;
        }
    }

    //4.最後に生き残ったチャンピオン(商品を返す)
    return expensiveProduct;
}

//テスト
console.log(filterByCategory(products, "fruit"));

console.log(calculateTotal(products));

console.log(getMostExpensive(products));