var Light = /** @class */ (function () {
    function Light() {
    }
    Light.prototype.on = function () {
        console.log("Light on");
    };
    Light.prototype.off = function () {
        console.log("Light off");
    };
    return Light;
}());
var Fan = /** @class */ (function () {
    function Fan() {
    }
    Fan.prototype.on = function () {
        console.log("Fan on");
    };
    Fan.prototype.off = function () {
        console.log("Fan off");
    };
    return Fan;
}());
var LightCommand = /** @class */ (function () {
    function LightCommand(l) {
        this.light = l;
    }
    LightCommand.prototype.execute = function () {
        this.light.on();
    };
    LightCommand.prototype.undo = function () {
        this.light.off();
    };
    return LightCommand;
}());
var FanCommand = /** @class */ (function () {
    function FanCommand(fan) {
        this.fan = fan;
    }
    FanCommand.prototype.execute = function () {
        this.fan.on();
    };
    FanCommand.prototype.undo = function () {
        this.fan.off();
    };
    return FanCommand;
}());
var RemoteController = /** @class */ (function () {
    function RemoteController() {
        this.buttons = [];
        this.buttonPressed = [];
        for (var index = 0; index < RemoteController.numButtons; index++) {
            this.buttons[index] = null;
            this.buttonPressed[index] = false;
        }
    }
    RemoteController.prototype.setCommand = function (index, cmd) {
        if (index >= 0 && index < RemoteController.numButtons) {
            if (this.buttons[index] != null) {
                delete this.buttons[index];
            }
            this.buttons[index] = cmd;
            this.buttonPressed[index] = false;
        }
    };
    RemoteController.prototype.pressButton = function (index) {
        if (index >= 0 && index < RemoteController.numButtons && this.buttons[index] != null) {
            if (this.buttonPressed[index] === false) {
                this.buttons[index].execute();
            }
            else {
                this.buttons[index].undo();
            }
            this.buttonPressed[index] = !this.buttonPressed[index];
        }
        else {
            console.log('Invalid command');
        }
    };
    RemoteController.numButtons = 4;
    return RemoteController;
}());
function main() {
    var light = new Light();
    var fan = new Fan();
    var rmController = new RemoteController();
    rmController.setCommand(0, new LightCommand(light));
    rmController.setCommand(1, new FanCommand(fan));
    rmController.pressButton(0);
    rmController.pressButton(0);
    console.log("For Fan");
    rmController.pressButton(1);
    rmController.pressButton(1);
}
main();
