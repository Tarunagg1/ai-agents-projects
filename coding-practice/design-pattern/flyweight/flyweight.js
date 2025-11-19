var ConcreteCharacter = /** @class */ (function () {
    function ConcreteCharacter(symbol) {
        this.symbol = symbol;
    }
    ConcreteCharacter.prototype.display = function (size, color, position) {
        console.log("Character: ".concat(this.symbol, ", Size: ").concat(size, ", Color: ").concat(color, ", Position: ").concat(position));
    };
    return ConcreteCharacter;
}());
var CharacterFactory = /** @class */ (function () {
    function CharacterFactory() {
        this.characters = new Map();
    }
    CharacterFactory.prototype.getCharacter = function (symbol) {
        if (!this.characters.has(symbol)) {
            this.characters.set(symbol, new ConcreteCharacter(symbol));
        }
        return this.characters.get(symbol);
    };
    CharacterFactory.prototype.listFlightWeights = function () {
        console.log("Factory has ".concat(this.characters.size, " flyweights"));
        this.characters.forEach(function (value, key) {
            console.log(key);
        });
    };
    return CharacterFactory;
}());
var factory = new CharacterFactory();
var charA = factory.getCharacter('A');
charA.display(12, "Red", 1);
var charB = factory.getCharacter('B');
charB.display(14, "Blue", 2);
// Reusing the same 'A' object
var charA2 = factory.getCharacter('A');
charA2.display(12, "Green", 3);
factory.listFlightWeights();
