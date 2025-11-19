interface PaymentMethod {
    pay(amount: number): void;
}



class PayPalPayment implements PaymentMethod {
    pay(amount: number): void {
        console.log('paying wala paypall');

    }
}


class cardMethod implements PaymentMethod {
    pay(amount: number): void {
        console.log('paying card paypall');

    }
}



class PaymentProcessor {
    constructor(private method: PaymentMethod) { }

    process(amount: number) {
        this.method.pay(amount);
    }
}


// Usage
// const processor = new PaymentProcessor(new PayPalPayment());
// processor.process(100);

