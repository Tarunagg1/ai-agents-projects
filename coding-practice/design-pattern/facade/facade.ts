class CPU {
    freeze() { console.log("CPU freezing..."); }
    jump(position: number) { console.log("CPU jumping to", position); }
    execute() { console.log("CPU executing..."); }
}


class Memory {
    load(position: number, data: string) {
        console.log(`Memory loading data '${data}' to position ${position}`);
    }
}

class ComputerFacade {
    private cpu = new CPU();
    private memory = new Memory();

    start() {
        this.cpu.freeze();
        this.memory.load(123, "BOOT");
        this.cpu.jump(123);
        this.cpu.execute();
    }
}


// Client code
const computer = new ComputerFacade();
computer.start();