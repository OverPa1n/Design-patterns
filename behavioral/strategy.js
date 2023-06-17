var PlaneType = /** @class */ (function () {
    function PlaneType() {
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
}());
var ShipType = /** @class */ (function () {
    function ShipType() {
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
}());
var CarType = /** @class */ (function () {
    function CarType() {
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
}());
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
        var price = this.shippingType.calculatePrice();
        var time = this.shippingType.calculateTime();
        return "Your price for shipping is: ".concat(price, " and time to ship is: ").concat(time);
    };
    return ShippingCompany;
}());
var shippingCompany = new ShippingCompany();
console.log(shippingCompany.ship('plane'));
