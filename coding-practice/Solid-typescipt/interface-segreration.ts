interface Workable {
    work(): void;
}

interface Eatable {
    eat(): void;
}



class Human implements Eatable {
    eat(): void {
        console.log('Human eat');

    }
}

class Robot implements Workable {
    work() {
        console.log("Robot working...");
    }
}

