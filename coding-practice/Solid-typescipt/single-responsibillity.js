var EmailService = /** @class */ (function () {
    function EmailService() {
    }
    EmailService.prototype.sendWelcomeEmail = function (to) {
        console.log('email send', to);
    };
    return EmailService;
}());
var UserRepository = /** @class */ (function () {
    function UserRepository() {
    }
    UserRepository.prototype.save = function (user) {
        console.log("Saving user ".concat(user, "..."));
    };
    return UserRepository;
}());
var UserService = /** @class */ (function () {
    function UserService(emailservice, userService) {
        this.emailservice = emailservice;
        this.userService = userService;
    }
    UserService.prototype.register = function (user) {
        // this.repo.save(user);
        this.emailservice.sendWelcomeEmail(user);
        this.userService.save(user);
    };
    return UserService;
}());
// const obj = new UserService(new EmailService(), new UserRepository());
// obj.register("ttarun@gmaill.com")
// Example 2
var Product = /** @class */ (function () {
    function Product(name, price) {
        console.log('ihji');
        this.pName = name;
        this.pPrice = price;
    }
    return Product;
}());
var ShoppingCart = /** @class */ (function () {
    function ShoppingCart() {
        this.products = [];
    }
    ShoppingCart.prototype.addProduct = function (p) {
        this.products.push(p);
    };
    ShoppingCart.prototype.getProducts = function () {
        return this.products;
    };
    ShoppingCart.prototype.getPrice = function () {
        var priceN = 0;
        for (var _i = 0, _a = this.products; _i < _a.length; _i++) {
            var product_1 = _a[_i];
            priceN += product_1.pPrice;
        }
        return priceN;
    };
    return ShoppingCart;
}());
var ShoppingCartPrinter = /** @class */ (function () {
    function ShoppingCartPrinter(shopppingCaret) {
        this.shopppingCaret = shopppingCaret;
    }
    ShoppingCartPrinter.prototype.printInvoice = function () {
        console.log('printing invoice');
        for (var _i = 0, _a = this.shopppingCaret.getProducts(); _i < _a.length; _i++) {
            var product_2 = _a[_i];
            console.log("Proruct name ".concat(product_2.pName, " and price is ").concat(product_2.pPrice, " \n"));
        }
    };
    return ShoppingCartPrinter;
}());
var ShoppingCartStorage = /** @class */ (function () {
    function ShoppingCartStorage(shopppingCaret) {
        this.shopppingCaret = shopppingCaret;
    }
    ShoppingCartStorage.prototype.saveTODb = function () {
        console.log('saaving cart in db');
    };
    return ShoppingCartStorage;
}());
var product = {
    pName: "samsung",
    pPrice: 100
};
var product2 = {
    pName: "samsung",
    pPrice: 100
};
var myCart = new ShoppingCart();
myCart.addProduct(product);
myCart.addProduct(product2);
var sumPrioce = myCart.getPrice();
console.log(sumPrioce);
var printCart = new ShoppingCartPrinter(myCart);
printCart.printInvoice();
