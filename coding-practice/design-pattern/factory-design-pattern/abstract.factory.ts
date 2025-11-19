interface IBurger {
    prepare(): void
}


interface Igarllic {
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


class Basicgarlic implements Igarllic {
    prepare(): void {
        console.log("Basic garlic");
    }
}


class Standardgarlic implements Igarllic {
    prepare(): void {
        console.log("Basic Standardgarlic");
    }
}


class Premiumgarlic implements Igarllic {
    prepare(): void {
        console.log("Basic Premiumgarlic");
    }
}


class BasicgarlicWheat implements Igarllic {
    prepare(): void {
        console.log("Basic BasicgarlicWheat");
    }
}


class StandardgarlicWheat implements Igarllic {
    prepare(): void {
        console.log("Basic StandardgarlicWheat");
    }
}

class PremiumgarlicWheat implements Igarllic {
    prepare(): void {
        console.log("Basic PremiumgarlicWheat");
    }
}


interface BurgerStandardFactory {
    createBurger(type: string): IBurger | null
    createGarlic(type: string): Igarllic | null
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

    createGarlic(type: string): Igarllic | null {
        if (type == "basic") {
            return new Basicgarlic();
        } else if (type == "standard") {
            return new Standardgarlic();
        } else if (type == "premium") {
            return new Premiumgarlic();
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


    createGarlic(type: string): Igarllic | null {
        if (type == "basic") {
            return new BasicgarlicWheat();
        } else if (type == "standard") {
            return new StandardgarlicWheat();
        } else if (type == "premium") {
            return new PremiumgarlicWheat();
        } else {
            return null;
        }
    }
}


const type: string = "basic";

// const BurgerFactory: BurgerStandardFactory = new SinghBurger();
// const burgger = BurgerFactory.createBurger(type)
// const garlic = BurgerFactory.createGarlic(type)

// burgger?.prepare()
// garlic?.prepare()



