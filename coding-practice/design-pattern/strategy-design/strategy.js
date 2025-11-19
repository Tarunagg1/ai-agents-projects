var CreditCardPayment = /** @class */ (function () {
    function CreditCardPayment() {
    }
    CreditCardPayment.prototype.pay = function (amount) {
        console.log("CreditCardPayment payment");
    };
    return CreditCardPayment;
}());
var PaypalPayment = /** @class */ (function () {
    function PaypalPayment() {
    }
    PaypalPayment.prototype.pay = function (amount) {
        console.log("PaypalPayment payment");
    };
    return PaypalPayment;
}());
var UpiPayment = /** @class */ (function () {
    function UpiPayment() {
    }
    UpiPayment.prototype.pay = function (amount) {
        console.log("UpiPayment  payment");
    };
    return UpiPayment;
}());
var PaymentContext = /** @class */ (function () {
    function PaymentContext(strategy) {
        this.strategy = strategy;
    }
    PaymentContext.prototype.setStrategy = function (strategy) {
        this.strategy = strategy; // can change dynamically
    };
    PaymentContext.prototype.checkout = function (amount) {
        this.strategy.pay(amount);
    };
    return PaymentContext;
}());
// User chooses PayPal
var payment = new PaymentContext(new PaypalPayment());
payment.checkout(500); // Paid 500 using PayPal
// Switch to Credit Card dynamically
payment.setStrategy(new CreditCardPayment());
payment.checkout(1000); // Paid 1000 using Credit Card
