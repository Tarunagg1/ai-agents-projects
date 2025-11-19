interface Character {
    getAbilities(): string
}


class Mario implements Character {
    getAbilities(): string {
        return "mario"
    }
}


class CharacterDecorator implements Character {
    private Character: Character;

    constructor(c: Character) {
        this.Character = c;
    }

    getAbilities(): string {
        
    }
}




