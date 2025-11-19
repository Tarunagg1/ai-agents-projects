class EmailService {
    sendWelcomeEmail(to: string) {
        console.log('email send', to);
    }
}

class UserRepository {
    save(user: string) {
        console.log(`Saving user ${user}...`);
    }
}

class UserService {
    constructor(private emailservice: EmailService, private userService: UserRepository) { }

    register(user: string) {
        // this.repo.save(user);
        this.emailservice.sendWelcomeEmail(user);
        this.userService.save(user)
    }

}

// const obj = new UserService(new EmailService(), new UserRepository());

// obj.register("ttarun@gmaill.com")


// Example 2

class Product {
    pName: string;
    pPrice: number;

    constructor(name: string, price: number) {
        console.log('ihji');
        this.pName = name;
        this.pPrice = price
    }
}

class ShoppingCart {
    private products: Product[] = []

    addProduct(p: Product) {
        this.products.push(p)
    }

    getProducts(): Product[] {
        return this.products
    }

    getPrice(): number {
        let priceN: number = 0;
        for (const product of this.products) {
            priceN += product.pPrice;
        }
        return priceN;
    }
}

class ShoppingCartPrinter {
    constructor(private shopppingCaret: ShoppingCart) { }

    printInvoice(): void {
        console.log('printing invoice');
        for (const product of this.shopppingCaret.getProducts()) {
            console.log(`Proruct name ${product.pName} and price is ${product.pPrice} \n`);
        }
    }
}

class ShoppingCartStorage {
    constructor(private shopppingCaret: ShoppingCart) { }

    saveTODb(): void {
        console.log('saaving cart in db');
    }
}

let product: Product = {
    pName: "samsung",
    pPrice: 100
}


let product2: Product = {
    pName: "samsung",
    pPrice: 100
}


const myCart = new ShoppingCart();
myCart.addProduct(product)

myCart.addProduct(product2)
let sumPrioce: number = myCart.getPrice()
console.log(sumPrioce);


const printCart = new ShoppingCartPrinter(myCart);

printCart.printInvoice();



