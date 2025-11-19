interface IAccount {
    getBalance(): number;
}


class SavingsAccount implements IAccount {
    constructor(private balance: number) { }

    getBalance(): number {
        return this.balance
    }


    withdraw(amount: number) {
        this.balance -= amount
    }
}

class FreeTrialAccount implements IAccount {
    getBalance(): number {
        return 0;
    }
}

function printBalance(account: IAccount) {
    console.log("Balance:", account.getBalance());
}

printBalance(new SavingsAccount(500));
printBalance(new FreeTrialAccount());