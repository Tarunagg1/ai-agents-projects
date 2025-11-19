var LRUCache = /** @class */ (function () {
    function LRUCache(capaciity) {
        this.capacity = capaciity;
        this.cache = new Map();
    }
    LRUCache.prototype.get = function (key) {
        if (!this.cache.has(key))
            return undefined;
        var value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    };
    LRUCache.prototype.put = function (key, value) {
        if (!this.cache.get(key)) {
            this.cache.delete(key);
        }
        else {
            var oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }
        this.cache.set(key, value);
    };
    return LRUCache;
}());
var lru = new LRUCache(10);
lru.put("name", "tarun");
console.log(lru.get("name"));
