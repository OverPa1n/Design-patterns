// Concrete animal classes
var Lion = /** @class */ (function () {
    function Lion() {
    }
    Lion.prototype.accept = function (visitor) {
        visitor.visitLion(this);
    };
    Lion.prototype.roar = function () {
        console.log("The lion roars!");
    };
    return Lion;
}());
var Tiger = /** @class */ (function () {
    function Tiger() {
    }
    Tiger.prototype.accept = function (visitor) {
        visitor.visitTiger(this);
    };
    Tiger.prototype.growl = function () {
        console.log("The tiger growls!");
    };
    return Tiger;
}());
var Bear = /** @class */ (function () {
    function Bear() {
    }
    Bear.prototype.accept = function (visitor) {
        visitor.visitBear(this);
    };
    Bear.prototype.standsOnLegs = function () {
        console.log("The bear stands on two legs and looks tall");
    };
    return Bear;
}());
// Concrete visitor classes
var FeedingVisitor = /** @class */ (function () {
    function FeedingVisitor() {
    }
    FeedingVisitor.prototype.visitLion = function (lion) {
        console.log("Feeding the lion.");
        lion.roar();
    };
    FeedingVisitor.prototype.visitTiger = function (tiger) {
        console.log("Feeding the tiger.");
        tiger.growl();
    };
    FeedingVisitor.prototype.visitBear = function (bear) {
        console.log("Bear, let's stay on two legs");
        bear.standsOnLegs();
    };
    return FeedingVisitor;
}());
var HealthCheckVisitor = /** @class */ (function () {
    function HealthCheckVisitor() {
    }
    HealthCheckVisitor.prototype.visitLion = function (lion) {
        console.log("Performing health check on the lion.");
        lion.roar();
    };
    HealthCheckVisitor.prototype.visitTiger = function (tiger) {
        console.log("Performing health check on the tiger.");
        tiger.growl();
    };
    HealthCheckVisitor.prototype.visitBear = function (bear) {
        console.log("Bear, let's stay on two legs");
        bear.standsOnLegs();
    };
    return HealthCheckVisitor;
}());
// Usage
var lion = new Lion();
var tiger = new Tiger();
var bear = new Bear();
var feedingVisitor = new FeedingVisitor();
var healthCheckVisitor = new HealthCheckVisitor();
lion.accept(feedingVisitor);
tiger.accept(feedingVisitor);
bear.accept(feedingVisitor);
console.log("------");
lion.accept(healthCheckVisitor);
tiger.accept(healthCheckVisitor);
bear.accept(healthCheckVisitor);
