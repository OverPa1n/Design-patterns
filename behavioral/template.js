var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * The template pattern is a design pattern that helps you create a blueprint or template for a process.
 * It allows you to define the overall structure of an algorithm while allowing specific steps to be implemented by different subclasses.
 */
var ShippingTypeStrategy = /** @class */ (function () {
    function ShippingTypeStrategy() {
    }
    ShippingTypeStrategy.prototype.getShippingInfo = function () {
        var price = this.calculatePrice();
        var time = this.calculateTime();
        return "Your price for shipping is: ".concat(price, " and time to ship is: ").concat(time);
    };
    return ShippingTypeStrategy;
}());
var PlaneType = /** @class */ (function (_super) {
    __extends(PlaneType, _super);
    function PlaneType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlaneType.prototype.calculateTime = function () {
        // calculation process
        return '5hr';
    };
    PlaneType.prototype.calculatePrice = function () {
        // calculation process
        return '1000$';
    };
    return PlaneType;
}(ShippingTypeStrategy));
var ShipType = /** @class */ (function (_super) {
    __extends(ShipType, _super);
    function ShipType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShipType.prototype.calculateTime = function () {
        // calculation process
        return '10 days';
    };
    ShipType.prototype.calculatePrice = function () {
        // calculation process
        return '3500$';
    };
    return ShipType;
}(ShippingTypeStrategy));
var CarType = /** @class */ (function (_super) {
    __extends(CarType, _super);
    function CarType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CarType.prototype.calculateTime = function () {
        // calculation process
        return '2 days';
    };
    CarType.prototype.calculatePrice = function () {
        // calculation process
        return '500$';
    };
    return CarType;
}(ShippingTypeStrategy));
var ShippingCompany = /** @class */ (function () {
    function ShippingCompany() {
        this.planeShipping = new PlaneType();
        this.shipShipping = new ShipType();
        this.carShipping = new CarType();
        this.shippingType = this.carShipping;
    }
    ShippingCompany.prototype.ship = function (shipType) {
        switch (shipType) {
            case 'car':
                this.shippingType = this.carShipping;
                break;
            case 'ship':
                this.shippingType = this.shipShipping;
                break;
            case 'plane':
                this.shippingType = this.planeShipping;
                break;
        }
        return this.shippingType.getShippingInfo();
    };
    return ShippingCompany;
}());
var shippingCompany = new ShippingCompany();
console.log(shippingCompany.ship('ship'));
