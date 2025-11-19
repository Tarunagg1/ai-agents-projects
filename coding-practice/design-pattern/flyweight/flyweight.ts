interface CharacterFlyweight {
    display(size: number, color: string, position: number): void
}

class ConcreteCharacter implements CharacterFlyweight {
    constructor(private symbol: string) { }

    display(size: number, color: string, position: number): void {
        console.log(`Character: ${this.symbol}, Size: ${size}, Color: ${color}, Position: ${position}`);
    }
}


class CharacterFactory {
    private characters: Map<string, CharacterFlyweight> = new Map();

    getCharacter(symbol: string): CharacterFlyweight {
        if (!this.characters.has(symbol)) {
            this.characters.set(symbol, new ConcreteCharacter(symbol));
        }
        return this.characters.get(symbol)!;
    }

    listFlightWeights(): void {
        console.log(`Factory has ${this.characters.size} flyweights`)
        this.characters.forEach((value, key) => {
            console.log(key);
        });
    }
}


const factory = new CharacterFactory();

const charA = factory.getCharacter('A');
charA.display(12, "Red", 1);

const charB = factory.getCharacter('B');
charB.display(14, "Blue", 2);

// Reusing the same 'A' object
const charA2 = factory.getCharacter('A');
charA2.display(12, "Green", 3);

factory.listFlightWeights();



