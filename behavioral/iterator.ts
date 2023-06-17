/**
 * The Iterator pattern allows clients to effectively loop over a collection of objects.
 */
class CustomIterator {
    private index: number;
    private readonly items: any;

    constructor(items: any) {
        this.index = 0;
        this.items = items;
    }

    first() {
        this.reset();

        return this.next();
    }

    next() {
        return this.items[this.index++];
    }

    reset(): void {
        this.index = 0;
    }

    hasNext(): boolean {
        return this.index <= this.items.length;
    }

    each(cb: Function): void {
        for (let i = this.first(); this.hasNext(); i = this.next()) {
            cb(i);
        }
    }
}

const iterator = new CustomIterator(['q', '2', '45']);

iterator.each(console.log)
