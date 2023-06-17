/**
 * The template pattern is a design pattern that helps you create a blueprint or template for a process.
 * It allows you to define the overall structure of an algorithm while allowing specific steps to be implemented by different subclasses.
 */
abstract class ShippingTypeStrategy {
    getShippingInfo() {
        const price = this.calculatePrice();
        const time = this.calculateTime();

        return `Your price for shipping is: ${price} and time to ship is: ${time}`
    }

    abstract calculateTime(): string;
    abstract calculatePrice(): string;
}

class PlaneType extends ShippingTypeStrategy {
    calculateTime() {
        // calculation process
        return '5hr';
    }

    calculatePrice() {
        // calculation process
        return '1000$';
    }
}

class ShipType extends ShippingTypeStrategy {
    calculateTime() {
        // calculation process
        return '10 days';
    }

    calculatePrice() {
        // calculation process
        return '3500$';
    }
}

class CarType extends ShippingTypeStrategy {
    calculateTime() {
        // calculation process
        return '2 days';
    }

    calculatePrice() {
        // calculation process
        return '500$';
    }
}

class ShippingCompany {
    private readonly planeShipping: PlaneType;
    private readonly shipShipping: ShipType;
    private readonly carShipping: CarType;

    protected shippingType: ShippingTypeStrategy;

    constructor() {
        this.planeShipping = new PlaneType();
        this.shipShipping = new ShipType();
        this.carShipping = new CarType();

        this.shippingType = this.carShipping;
    }

    ship(shipType) {
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
    }
}

const shippingCompany = new ShippingCompany();
console.log(shippingCompany.ship('ship'));
