var NumberCollection = /** @class */ (function () {
    function NumberCollection() {
        this.items = [];
    }
    NumberCollection.prototype.add = function (item) {
        this.items.push(item);
    };
    NumberCollection.prototype.createIterator = function () {
        return new NumberIterator(this);
    };
    NumberCollection.prototype.getItems = function () {
        return this.items;
    };
    return NumberCollection;
}());
var NumberIterator = /** @class */ (function () {
    function NumberIterator(collection) {
        this.currentIndex = 0;
        this.collection = collection;
    }
    NumberIterator.prototype.current = function () {
        if (this.currentIndex < this.collection.getItems().length) {
            return this.collection.getItems()[this.currentIndex];
        }
        return null;
    };
    NumberIterator.prototype.hasNext = function () {
        return this.currentIndex < this.collection.getItems().length;
    };
    NumberIterator.prototype.next = function () {
        this.currentIndex++;
        if (this.currentIndex < this.collection.getItems().length) {
            return this.collection.getItems()[this.currentIndex];
        }
        return undefined;
    };
    NumberIterator.prototype.reset = function () {
        this.currentIndex = 0;
    };
    return NumberIterator;
}());
var collection = new NumberCollection();
collection.add(10);
collection.add(20);
collection.add(30);
var iterator = collection.createIterator();
while (iterator.hasNext()) {
    console.log(iterator.current());
    iterator.next();
}
