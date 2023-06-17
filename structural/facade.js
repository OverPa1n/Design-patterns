/**
 * The Façade pattern provides an interface which shields clients from complex functionality in one or more subsystems.
 * It is a simple pattern that may seem trivial, but it is powerful and extremely useful.
 * It is often present in systems that are built around a multi-layer architecture.
 *
 * The intent of the Façade is to provide a high-level interface (properties and methods) that makes a subsystem or toolkit easy to use for the client.
 */
var CarFactory = /** @class */ (function () {
    function CarFactory(carConstructor) {
        this.carConstructor = carConstructor;
    }
    CarFactory.prototype.getCar = function () {
        console.log(this.carConstructor.construct());
    };
    return CarFactory;
}());
var CarParts = /** @class */ (function () {
    function CarParts() {
    }
    CarParts.prototype.createBody = function () {
        return 'Body of a car';
    };
    CarParts.prototype.createHeadlights = function () {
        return 'Headlights of a car';
    };
    CarParts.prototype.createEngine = function () {
        return 'Engine of a car';
    };
    CarParts.prototype.createWheels = function () {
        return 'Wheels of a car';
    };
    return CarParts;
}());
//Facade
var CarConstructor = /** @class */ (function () {
    function CarConstructor(carParts) {
        this.carParts = carParts;
    }
    // The method is used to construct a whole car without calling each part of car one by one in CarFactory
    CarConstructor.prototype.construct = function () {
        return {
            engine: this.carParts.createEngine(),
            wheels: this.carParts.createWheels(),
            headlights: this.carParts.createHeadlights(),
            body: this.carParts.createBody()
        };
    };
    return CarConstructor;
}());
function facade() {
    var carParts = new CarParts();
    var carConstructor = new CarConstructor(carParts);
    var carFactory = new CarFactory(carConstructor);
    carFactory.getCar();
}
facade();
