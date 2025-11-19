interface Command {
    execute(): void;
    undo(): void
}


class Light {
    on(): void {
        console.log("Light on");
    }
    off(): void {
        console.log("Light off");
    }

}

class Fan {
    on(): void {
        console.log("Fan on");
    }
    off(): void {
        console.log("Fan off");
    }

}


class LightCommand implements Command {
    private light: Light;

    constructor(l: Light) {
        this.light = l;
    }

    execute(): void {
        this.light.on()
    }

    undo(): void {
        this.light.off();
    }
}


class FanCommand implements Command {
    private fan: Fan;

    constructor(fan: Fan) {
        this.fan = fan;
    }

    execute(): void {
        this.fan.on()
    }

    undo(): void {
        this.fan.off();
    }
}

class RemoteController {
    static numButtons: number = 4;
    buttons: (Command | null)[] = [];
    buttonPressed: boolean[] = [];

    constructor() {
        for (let index = 0; index < RemoteController.numButtons; index++) {
            this.buttons[index] = null;
            this.buttonPressed[index] = false;
        }
    }

    setCommand(index: number, cmd: Command): void {
        if (index >= 0 && index < RemoteController.numButtons) {
            if (this.buttons[index] != null) {
                delete this.buttons[index]
            }
            this.buttons[index] = cmd;
            this.buttonPressed[index] = false
        }
    }

    pressButton(index: number): void {
        if (index >= 0 && index < RemoteController.numButtons && this.buttons[index] != null) {
            if (this.buttonPressed[index] === false) {
                this.buttons[index].execute()
            } else {
                this.buttons[index].undo()
            }
            this.buttonPressed[index] = !this.buttonPressed[index];
        } else {
            console.log('Invalid command');
        }
    }

}




function main() {
    const light: Light = new Light();
    const fan: Fan = new Fan();

    const rmController = new RemoteController();

    rmController.setCommand(0, new LightCommand(light))
    rmController.setCommand(1, new FanCommand(fan))

    rmController.pressButton(0)
    rmController.pressButton(0)

    console.log("For Fan");

    rmController.pressButton(1)
    rmController.pressButton(1)

}

main()