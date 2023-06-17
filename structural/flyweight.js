/**
 * The Flyweight pattern conserves memory by sharing large numbers of fine-grained objects efficiently.
 * Shared flyweight objects are immutable, that is, they cannot be changed as they represent the characteristics that are shared with other objects.
 *
 * Essentially Flyweight is an 'object normalization technique' in which common properties are factored out into shared flyweight objects.
 * (Note: the idea is similar to data model normalization, a process in which the modeler attempts to minimize redundancy).
 */
var Flyweight = /** @class */ (function () {
    function Flyweight(specs) {
        this.processor = specs.processor;
        this.ram = specs.ram;
    }
    return Flyweight;
}());
var FlyweightFactory = /** @class */ (function () {
    function FlyweightFactory() {
        this.flyweightCollection = new Map();
    }
    FlyweightFactory.prototype.getFlyweight = function (specs) {
        var key = "".concat(specs.ram, "_").concat(specs.processor);
        var flyweightObject = this.flyweightCollection.get(key);
        if (!flyweightObject) {
            flyweightObject = new Flyweight(specs);
            this.flyweightCollection.set(key, flyweightObject);
        }
        return flyweightObject;
    };
    FlyweightFactory.prototype.getFlyweightStatistic = function () {
        return this.flyweightCollection;
    };
    return FlyweightFactory;
}());
var Computer = /** @class */ (function () {
    function Computer(details, specs) {
        this.model = details.model;
        this.name = details.name;
        this.price = details.price;
        this.processor = specs.processor;
        this.ram = specs.ram;
    }
    return Computer;
}());
var ComputerFactory = /** @class */ (function () {
    function ComputerFactory() {
        this.count = 0;
        this.computers = {};
        this.flyweightFactory = new FlyweightFactory();
    }
    ComputerFactory.prototype.createComputer = function (details, specs, id) {
        var flyweight = this.flyweightFactory.getFlyweight(specs);
        this.computers[id] = new Computer(details, flyweight);
        this.count++;
    };
    ComputerFactory.prototype.getComputers = function () {
        return this.computers;
    };
    ComputerFactory.prototype.getCount = function () {
        return this.count;
    };
    ComputerFactory.prototype.getFlyweightStatistic = function () {
        return this.flyweightFactory.getFlyweightStatistic();
    };
    return ComputerFactory;
}());
var computerFactory = new ComputerFactory();
computerFactory.createComputer({ model: 'ZL1', name: 'Beast', price: 4000 }, { processor: 'Inter Core i9', ram: '32gb' }, 1);
computerFactory.createComputer({ model: 'ZL1', name: 'Beast', price: 4000 }, { processor: 'Inter Core i9', ram: '32gb' }, 2);
computerFactory.createComputer({ model: 'ZL2', name: 'Beast', price: 3700 }, { processor: 'Inter Core i7', ram: '16gb' }, 3);
computerFactory.createComputer({ model: 'ZL3', name: 'Beast', price: 3500 }, { processor: 'Inter Core i5', ram: '8gb' }, 4);
computerFactory.createComputer({ model: 'ZL3', name: 'Beast', price: 3500 }, { processor: 'Inter Core i5', ram: '8gb' }, 4);
computerFactory.createComputer({ model: 'ZL3', name: 'Beast', price: 3500 }, { processor: 'Inter Core i5', ram: '8gb' }, 4);
console.log('COMPUTERS: ', computerFactory.getComputers());
console.log('COMPUTERS COUNT: ', computerFactory.getCount());
console.log('FLYWEIGHT STATISTIC: ', computerFactory.getFlyweightStatistic());
