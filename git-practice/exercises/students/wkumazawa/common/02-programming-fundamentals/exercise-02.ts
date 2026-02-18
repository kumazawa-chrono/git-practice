//課題２:クラスとインターフェース


//2-1:銀行口座クラス

class BankAccount {
    //プロパティの定義
    public owner: string;
    private balance: number; //外部から直接書き換えられないようにprivateにする

    constructor(owner: string) {
        this.owner =owner;
        this.balance = 0; //初期値は0
    }
    //入金メゾット
    deposit(amount: number): void {
        if (amount <= 0) {
            console.log("正の数値を入力してください");
            return;
        }
        this.balance += amount;
    }

    //出勤メゾット
    withdraw(amount: number): void {
        if (amount > this.balance) {
            throw new Error("残高不足です");
        }
        this.balance -= amount;
    }

    //残高取得メゾット
    getBalance(): number {
        return this.balance;
    }

    //送金メゾット
    transfer(to: BankAccount, amount: number): void {
        //1.自分の口座から引き出す
        this.withdraw(amount);
        //2.相手の口座に入金する
        to.deposit(amount);
    }
}

//テストコード

const alice = new BankAccount("Alice");
const bob = new BankAccount("Bob");

alice.deposit(1000);
console.log(alice.getBalance()); //1000

alice.withdraw(300);
console.log(alice.getBalance()); //700

alice.transfer(bob, 200);
console.log(alice.getBalance()); //500
console.log(bob.getBalance()); //200


//2-2図形クラス

abstract class Shape {
  abstract getArea(): number;
  abstract getPerimeter(): number;

  describe(): string {
    return `面積: ${this.getArea().toFixed(2)}, 周囲: ${this.getPerimeter().toFixed(2)}`;
  }
}

// ここから下に Circle, Rectangle, Triangle の実装を続ける...


// 1. 円（Circle）
class Circle extends Shape {
  radius: number; // プロパティを明示的に宣言

  constructor(radius: number) {
    super();
    this.radius = radius; // 手動で代入
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

// 2. 長方形（Rectangle）
class Rectangle extends Shape {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return (this.width + this.height) * 2;
  }
}

// 3. 三角形（Triangle）
class Triangle extends Shape {
  a: number;
  b: number;
  c: number;

  constructor(a: number, b: number, c: number) {
    super();
    this.a = a;
    this.b = b;
    this.c = c;
  }

  getArea(): number {
    const s = (this.a + this.b + this.c) / 2;
    return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
  }

  getPerimeter(): number {
    return this.a + this.b + this.c;
  }
}

// --- テストコード ---
const circle = new Circle(5);
console.log(`Circle    -> ${circle.describe()}`);

const rect = new Rectangle(4, 5);
console.log(`Rectangle -> ${rect.describe()}`);

const triangle = new Triangle(3, 4, 5);
console.log(`Triangle  -> ${triangle.describe()}`);


//2-3ショッピングカート

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface Cart {
    items: CartItem[];
    addItem(item: Omit<CartItem, "quantity">, quantity?: number): void;
    removeItem(id: number): void;
    updateQuantity(id: number, quantity: number): void;
    getTotal(): number;
    getItemCount(): number;
}


class ShoppingCart implements Cart {
    //1.カートの中身を保存する配列
    items: CartItem[] = [];

    //2.アイテムを追加する
    addItem(item: Omit<CartItem, "quantity">, quantity: number = 1): void {
        //すでに同じIDの商品があるか確認
        const existingItem = this.items.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        }else {
            //なければ新しく追加
            this.items.push({ ...item, quantity });
        }
    }

    //3.アイテムを削除する
    removeItem(id: number): void {
        this.items = this.items.filter(item => item.id !== id);
    }

    //4.数量を更新する
    updateQuantity(id: number, quantity: number): void {
        const item = this.items.find(i => i.id === id);
        if (item) {
            item.quantity = quantity;
        }
    }

    //5.合計金額を計算する
    getTotal(): number {
        return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    //6.商品の総数を計算する
    getItemCount(): number {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    }

    //テストコード

    const cart = new ShoppingCart();

    cart.addItem({ id: 1, name: "Apple", price: 100 }, 3);
    cart.addItem({ id: 2, name: "Banana", price: 80 }, 2);

    console.log("Total (expected 460):", cart.getTotal());
    console.log("Count (expected 5):", cart.getItemCount());

    cart.updateQuantity(1, 5);
    console.log("Total after update (expected 660):", cart.getTotal());

    cart.removeItem(2);
    console.log("Total after remove (expected 500):", cart.getTotal());
