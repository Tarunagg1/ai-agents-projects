var PayPalPayment = /** @class */ (function () {
    function PayPalPayment() {
    }
    PayPalPayment.prototype.pay = function (amount) {
        console.log('paying wala paypall');
    };
    return PayPalPayment;
}());
var cardMethod = /** @class */ (function () {
    function cardMethod() {
    }
    cardMethod.prototype.pay = function (amount) {
        console.log('paying card paypall');
    };
    return cardMethod;
}());
var PaymentProcessor = /** @class */ (function () {
    function PaymentProcessor(method) {
        this.method = method;
    }
    PaymentProcessor.prototype.process = function (amount) {
        this.method.pay(amount);
    };
    return PaymentProcessor;
}());
// Usage
var processor = new PaymentProcessor(new PayPalPayment());
processor.process(100);
