/**
 * The Iterator pattern allows clients to effectively loop over a collection of objects.
 */
// @ts-ignore
var CustomIterator = /** @class */ (function () {
    function CustomIterator(items) {
        this.index = 0;
        this.items = items;
    }
    CustomIterator.prototype.first = function () {
        this.reset();
        return this.next();
    };
    CustomIterator.prototype.next = function () {
        return this.items[this.index++];
    };
    CustomIterator.prototype.reset = function () {
        this.index = 0;
    };
    CustomIterator.prototype.hasNext = function () {
        return this.index <= this.items.length;
    };
    CustomIterator.prototype.each = function (cb) {
        for (var i = this.first(); this.hasNext(); i = this.next()) {
            cb(i);
        }
    };
    return CustomIterator;
}());
var iterator = new CustomIterator(['q', '2', '45']);
iterator.each(console.log);
