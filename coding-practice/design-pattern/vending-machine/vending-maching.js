class vendingMachine {
    constructor() {
        this.denos = [500, 200, 100, 50, 20, 10, 5, 2, 1]

        this.products = [
            {
                id: 1,
                name: 'Water',
                price: 30
            }
        ]

        this.selectedProduct = null;

        this.balance = 0;
    }

    restock(product) {
        const isExists = this.products.find(item => item.id === product.id);

        if (isExists) {
            return {
                Ok: false,
                mnessage: "Slot is not empty"
            }
        }

        this.products.push(product)

        return {
            Ok: true,
            mnessage: "Product added"
        }
    }

    selectProduct(id) {
        const product = this.products.find(item => item.id === id);

        if (!product) {
            return {
                Ok: false,
                mnessage: "Unkown product"
            }
        }

        this.selectProduct = product;

        return {
            Ok: true,
            mnessage: "Please insert the coin"
        }
    }

    insertCoin(bill) {
        if (!Number.isInteger(bill) || bill <= 0) {
            return {
                Ok: false,
                mnessage: "Unkown bill"
            }
        }


        this.balance += bill;

        if (this.selectProduct.price > this.balance) {
            return {
                Ok: false,
                mnessage: `Insert ${this.selectProduct.price - this.balance} more due`
            }
        }

        return this.dispense(this.selectProduct)
    }

    dispense(product) {
        this.products = this.products.filter(item => item.id !== product.id);
        const notesToReturn = this.returnChange();
        this.balance = 0;
        this.selectProduct = null;

        return {
            Ok: true,
            message: `Product has been dispense ${notesToReturn.join(",")}`,
        }
    }

    returnChange() {
        let returnBalance = this.balance - this.selectProduct.price;
        const coins = [];


        for (const note of this.denos) {
            while (returnBalance >= note) {
                coins.push(note)
                returnBalance -= note
            }
        }

        return coins;
    }

}



const vm = new vendingMachine();
const selectedProduct = vm.selectProduct(10);
console.log(selectedProduct);

if (!selectedProduct.Ok) {
    throw new Error(selectedProduct.message);
}

const msg = vm.insertCoin(520)


console.log(msg);

// console.log(vm);


