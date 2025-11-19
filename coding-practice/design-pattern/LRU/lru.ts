class LRUCache<k, v> {
    private cache: Map<k, v>;
    private capacity: number;

    constructor(capaciity: number) {
        this.capacity = capaciity;
        this.cache = new Map();
    }

    get(key: k): v | undefined {
        if (!this.cache.has(key)) return undefined

        const value = this.cache.get(key);

        this.cache.delete(key);
        this.cache.set(key, value as v);
        return value
    }

    put(key: k, value: v) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }

        if (this.cache.size === this.capacity) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey as k);
        }
        this.cache.set(key, value);
    }
}


const lru = new LRUCache<string, string>(10)

lru.put("name", "tarun")
console.log(lru.get("name"));
