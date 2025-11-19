interface PaymentStrategy {
    pay(amount: number): void;
}



class CreditCardPayment implements PaymentStrategy {
    pay(amount: number) {
        console.log("CreditCardPayment payment");
    }
}


class PaypalPayment implements PaymentStrategy {
    pay(amount: number) {
        console.log("PaypalPayment payment");
    }
}


class UpiPayment implements PaymentStrategy {
    pay(amount: number) {
        console.log("UpiPayment  payment");
    }
}



class PaymentContext {

    private strategy: PaymentStrategy

    constructor(strategy: PaymentStrategy) {
        this.strategy = strategy;
    }


    setStrategy(strategy: PaymentStrategy) {
        this.strategy = strategy; // can change dynamically
    }

    checkout(amount: number) {
        this.strategy.pay(amount);
    }
}

// User chooses PayPal
const payment = new PaymentContext(new PaypalPayment());
payment.checkout(500);  // Paid 500 using PayPal

// Switch to Credit Card dynamically
payment.setStrategy(new CreditCardPayment());
payment.checkout(1000); // Paid 1000 using Credit Card

