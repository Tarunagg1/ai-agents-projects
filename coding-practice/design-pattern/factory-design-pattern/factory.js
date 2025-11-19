var BasicBurger = /** @class */ (function () {
    function BasicBurger() {
    }
    BasicBurger.prototype.prepare = function () {
        console.log("Basic burger");
    };
    return BasicBurger;
}());
var StandardBurger = /** @class */ (function () {
    function StandardBurger() {
    }
    StandardBurger.prototype.prepare = function () {
        console.log("Basic StandardBurger");
    };
    return StandardBurger;
}());
var PremiumBurger = /** @class */ (function () {
    function PremiumBurger() {
    }
    PremiumBurger.prototype.prepare = function () {
        console.log("Basic PremiumBurger");
    };
    return PremiumBurger;
}());
var BasicBurgerWheat = /** @class */ (function () {
    function BasicBurgerWheat() {
    }
    BasicBurgerWheat.prototype.prepare = function () {
        console.log("Basic BasicBurgerWheat");
    };
    return BasicBurgerWheat;
}());
var StandardBurgerWheat = /** @class */ (function () {
    function StandardBurgerWheat() {
    }
    StandardBurgerWheat.prototype.prepare = function () {
        console.log("Basic StandardBurgerWheat");
    };
    return StandardBurgerWheat;
}());
var PremiumBurgerWheat = /** @class */ (function () {
    function PremiumBurgerWheat() {
    }
    PremiumBurgerWheat.prototype.prepare = function () {
        console.log("Basic PremiumBurgerWheat");
    };
    return PremiumBurgerWheat;
}());
var SinghBurger = /** @class */ (function () {
    function SinghBurger() {
    }
    SinghBurger.prototype.createBurger = function (type) {
        if (type == "basic") {
            return new BasicBurger();
        }
        else if (type == "standard") {
            return new StandardBurger();
        }
        else if (type == "premium") {
            return new PremiumBurger();
        }
        else {
            return null;
        }
    };
    return SinghBurger;
}());
var KingBurger = /** @class */ (function () {
    function KingBurger() {
    }
    KingBurger.prototype.createBurger = function (type) {
        if (type == "basic") {
            return new BasicBurgerWheat();
        }
        else if (type == "standard") {
            return new StandardBurgerWheat();
        }
        else if (type == "premium") {
            return new PremiumBurgerWheat();
        }
        else {
            return null;
        }
    };
    return KingBurger;
}());
var type = "basic";
var BurgerFactory = new SinghBurger();
var burgger = BurgerFactory.createBurger(type);
burgger === null || burgger === void 0 ? void 0 : burgger.prepare();
