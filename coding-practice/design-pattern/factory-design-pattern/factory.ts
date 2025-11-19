interface IBurger {
    prepare(): void
}


class BasicBurger implements IBurger {
    prepare(): void {
        console.log("Basic burger");
    }
}


class StandardBurger implements IBurger {
    prepare(): void {
        console.log("Basic StandardBurger");
    }
}


class PremiumBurger implements IBurger {
    prepare(): void {
        console.log("Basic PremiumBurger");
    }
}


class BasicBurgerWheat implements IBurger {
    prepare(): void {
        console.log("Basic BasicBurgerWheat");
    }
}


class StandardBurgerWheat implements IBurger {
    prepare(): void {
        console.log("Basic StandardBurgerWheat");
    }
}


class PremiumBurgerWheat implements IBurger {
    prepare(): void {
        console.log("Basic PremiumBurgerWheat");
    }
}


interface BurgerStandardFactory {
    createBurger(type: string): IBurger | null
}


class SinghBurger implements BurgerStandardFactory {
    createBurger(type: string): IBurger | null {
        if (type == "basic") {
            return new BasicBurger();
        } else if (type == "standard") {
            return new StandardBurger();
        } else if (type == "premium") {
            return new PremiumBurger();
        } else {
            return null;
        }
    }
}



class KingBurger implements BurgerStandardFactory {
    createBurger(type: string): IBurger | null {
        if (type == "basic") {
            return new BasicBurgerWheat();
        } else if (type == "standard") {
            return new StandardBurgerWheat();
        } else if (type == "premium") {
            return new PremiumBurgerWheat();
        } else {
            return null;
        }
    }
}


const type: string = "basic";

const BurgerFactory: BurgerStandardFactory = new SinghBurger();
const burgger = BurgerFactory.createBurger(type)
burgger?.prepare()



