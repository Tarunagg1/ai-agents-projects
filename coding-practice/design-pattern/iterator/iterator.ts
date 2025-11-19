interface MyIterator<T> {
    hasNext(): boolean;
    next(): T | undefined;
    current(): T | null;
    reset(): void;
}


interface Aggregate<T> {
    createIterator(): MyIterator<T>;
}


class NumberCollection implements Aggregate<number> {
    private items: number[] = [];

    add(item: number): void {
        this.items.push(item);
    }

    createIterator(): MyIterator<number> {
        return new NumberIterator(this);
    }

    getItems(): number[] {
        return this.items;
    }
}

class NumberIterator implements MyIterator<number> {
    private collection: NumberCollection;
    private currentIndex: number = 0;


    constructor(collection: NumberCollection) {
        this.collection = collection;
    }

    current(): number | null {
        if (this.currentIndex < this.collection.getItems().length) {
            return this.collection.getItems()[this.currentIndex];
        }
        return null;
    }

    hasNext(): boolean {
        return this.currentIndex < this.collection.getItems().length;
    }

    next(): number | undefined {
        this.currentIndex++;
        if (this.currentIndex < this.collection.getItems().length) {
            return this.collection.getItems()[this.currentIndex];
        }
        return undefined;
    }

    reset(): void {
        this.currentIndex = 0;
    }
}



const collection = new NumberCollection();
collection.add(10);
collection.add(20);
collection.add(30);

const iterator = collection.createIterator();

while (iterator.hasNext()) {
    console.log(iterator.current());
    iterator.next();
}

