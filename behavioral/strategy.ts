/**
 * The strategy pattern is a behavioral design pattern that allows a class to use different algorithms at runtime.
 */
interface ShippingTypeStrategy {
    calculateTime: () => void;
    calculatePrice: () => void;
}

class PlaneType implements ShippingTypeStrategy {
    calculateTime() {
        // calculation process
        return '5hr';
    }

    calculatePrice() {
        // calculation process
        return '1000$';
    }
}

class ShipType implements ShippingTypeStrategy {
    calculateTime() {
        // calculation process
        return '10 days';
    }

    calculatePrice() {
        // calculation process
        return '3500$';
    }
}

class CarType implements ShippingTypeStrategy {
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

        const price = this.shippingType.calculatePrice();
        const time = this.shippingType.calculateTime();

        return `Your price for shipping is: ${price} and time to ship is: ${time}`
    }
}

const shippingCompany = new ShippingCompany();
console.log(shippingCompany.ship('plane'));
