/**
 * The Façade pattern provides an interface which shields clients from complex functionality in one or more subsystems.
 * It is a simple pattern that may seem trivial, but it is powerful and extremely useful.
 * It is often present in systems that are built around a multi-layer architecture.
 *
 * The intent of the Façade is to provide a high-level interface (properties and methods) that makes a subsystem or toolkit easy to use for the client.
 */

interface PartsInterface {
    createBody: Function;
    createHeadlights: Function;
    createEngine: Function;
    createWheels: Function;
}

interface CarConstructorInterface {
    construct: Function;
}

class CarFactory {
    carConstructor: CarConstructorInterface;

    constructor(carConstructor: CarConstructorInterface) {
        this.carConstructor = carConstructor;
    }

    getCar() {
        console.log(this.carConstructor.construct());
    }
}

class CarParts implements PartsInterface {
    createBody() {
        return 'Body of a car';
    }

    createHeadlights() {
        return 'Headlights of a car';
    }

    createEngine() {
        return 'Engine of a car';
    }

    createWheels() {
        return 'Wheels of a car';
    }
}

//Facade
class CarConstructor implements CarConstructorInterface {
    carParts: PartsInterface

    constructor(carParts: PartsInterface) {
        this.carParts = carParts;
    }

// The method is used to construct a whole car without calling each part of car one by one in CarFactory
// All internal details of creating a car is hide under the construct method. Client just need to call the method
    construct() {
        return {
            engine: this.carParts.createEngine(),
            wheels: this.carParts.createWheels(),
            headlights: this.carParts.createHeadlights(),
            body: this.carParts.createBody()
        }
    }
}

function facade() {
    const carParts = new CarParts();
    const carConstructor = new CarConstructor(carParts);
    const carFactory = new CarFactory(carConstructor);

    carFactory.getCar();
}

facade();
