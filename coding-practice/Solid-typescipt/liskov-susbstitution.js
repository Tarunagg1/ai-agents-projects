var SavingsAccount = /** @class */ (function () {
    function SavingsAccount(balance) {
        this.balance = balance;
    }
    SavingsAccount.prototype.getBalance = function () {
        return this.balance;
    };
    SavingsAccount.prototype.withdraw = function (amount) {
        this.balance -= amount;
    };
    return SavingsAccount;
}());
var FreeTrialAccount = /** @class */ (function () {
    function FreeTrialAccount() {
    }
    FreeTrialAccount.prototype.getBalance = function () {
        return 0;
    };
    return FreeTrialAccount;
}());
function printBalance(account) {
    console.log("Balance:", account.getBalance());
}
printBalance(new SavingsAccount(500));
printBalance(new FreeTrialAccount());
