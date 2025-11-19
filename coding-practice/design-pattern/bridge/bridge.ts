interface Engine {
    start(): void;
}

class PetrolEngine implements Engine {
    start(): void {
        console.log("Petrol engine started");
    }
}

class DieselEngine implements Engine {
    start(): void {
        console.log("Diesel engine started");
    }
}


class ElectricEngine implements Engine {
    start(): void {
        console.log("Electric engine started");
    }
}

abstract class Vehicle {
    protected engine: Engine;

    constructor(engine: Engine) {
        this.engine = engine;
    }
    abstract drive(): void;
}


class Sedan extends Vehicle {

    constructor(engine: Engine) {
        super(engine);
    }

    drive(): void {
        this.engine.start();
    }
}



class SUV extends Vehicle {
    constructor(engine: Engine) {
        super(engine);
    }
    drive(): void {
        this.engine.start();
    }
}




function main() {
    const petrolEngine = new PetrolEngine();
    const dieselEngine = new DieselEngine();
    const electricEngine = new ElectricEngine();

    const sedan = new Sedan(petrolEngine);
    const suv = new SUV(dieselEngine);

    sedan.drive();
    suv.drive();
}