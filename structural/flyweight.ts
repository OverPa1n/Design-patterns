/**
 * The Flyweight pattern conserves memory by sharing large numbers of fine-grained objects efficiently.
 * Shared flyweight objects are immutable, that is, they cannot be changed as they represent the characteristics that are shared with other objects.
 *
 * Essentially Flyweight is an 'object normalization technique' in which common properties are factored out into shared flyweight objects.
 * (Note: the idea is similar to data model normalization, a process in which the modeler attempts to minimize redundancy).
 */

interface ComputerDetails {
    model: string;
    name: string;
    price: number;
}

interface ComputerSpecs {
    processor: string;
    ram: string;
}

class Flyweight {
    processor: string;
    ram: string;

    constructor(specs: ComputerSpecs) {
        this.processor = specs.processor;
        this.ram = specs.ram;
    }
}

class FlyweightFactory {
    flyweightCollection: Map<any, any>;

    constructor() {
        this.flyweightCollection = new Map();
    }

    getFlyweight(specs: ComputerSpecs) {
        const key = `${specs.ram}_${specs.processor}`;
        let flyweightObject = this.flyweightCollection.get(key);

        if (!flyweightObject) {
            flyweightObject = new Flyweight(specs);

            this.flyweightCollection.set(key, flyweightObject);
        }

        return flyweightObject;
    }

    getFlyweightStatistic() {
        return this.flyweightCollection;
    }
}

class Computer {
    model: string;
    name: string;
    price: number;
    processor: string;
    ram: string;

    constructor(details: ComputerDetails, specs: ComputerSpecs) {
        this.model = details.model;
        this.name = details.name;
        this.price = details.price;
        this.processor = specs.processor;
        this.ram = specs.ram;
    }
}

class ComputerFactory {
    computers: any;
    count = 0;
    flyweightFactory;

    constructor() {
        this.computers = {};
        this.flyweightFactory = new FlyweightFactory();
    }

    createComputer(details: ComputerDetails, specs: ComputerSpecs, id: number) {
        const flyweight = this.flyweightFactory.getFlyweight(specs);

        this.computers[id] = new Computer(details, flyweight);
        this.count++;
    }

    getComputers() {
        return this.computers;
    }

    getCount() {
        return this.count;
    }

    getFlyweightStatistic() {
        return this.flyweightFactory.getFlyweightStatistic();
    }
}

const computerFactory = new ComputerFactory();

computerFactory.createComputer({model: 'ZL1', name: 'Beast', price: 4000}, {processor: 'Inter Core i9', ram: '32gb'}, 1);
computerFactory.createComputer({model: 'ZL1', name: 'Beast', price: 4000}, {processor: 'Inter Core i9', ram: '32gb'}, 2);
computerFactory.createComputer({model: 'ZL2', name: 'Beast', price: 3700}, {processor: 'Inter Core i7', ram: '16gb'}, 3);
computerFactory.createComputer({model: 'ZL3', name: 'Beast', price: 3500}, {processor: 'Inter Core i5', ram: '8gb'}, 4);
computerFactory.createComputer({model: 'ZL3', name: 'Beast', price: 3500}, {processor: 'Inter Core i5', ram: '8gb'}, 4);
computerFactory.createComputer({model: 'ZL3', name: 'Beast', price: 3500}, {processor: 'Inter Core i5', ram: '8gb'}, 4);

console.log('COMPUTERS: ', computerFactory.getComputers());
console.log('COMPUTERS COUNT: ', computerFactory.getCount());
console.log('FLYWEIGHT STATISTIC: ', computerFactory.getFlyweightStatistic());

