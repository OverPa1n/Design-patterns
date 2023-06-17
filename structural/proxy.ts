/**
 * The Proxy pattern provides a surrogate or placeholder object for another object and controls access to this other object.
 * In other words, the proxy acts as an intermediary between the client and the actual object, intercepting requests and managing their execution.
 *
 * The main goal of the Proxy pattern is to add an extra layer of indirection to support additional features such as caching,
 * logging, access control, and performance optimization, without changing the underlying functionality of the actual object.
 */

interface CarInterface {
    id: number;
    make: string;
    year: number;
}

interface CarApiInterface {
    get: (id: number) => CarInterface | unknown;
}

class CarApi implements CarApiInterface {
    carList: Array<CarInterface>;
    
    constructor() {
        this.carList = [
            {
                id: 1,
                make: 'audi',
                year: 2021
            },
            {
                id: 2,
                make: 'bmw',
                year: 2019
            },
            {
                id: 3,
                make: 'tesla',
                year: 2023
            },
            {
                id: 4,
                make: 'ford',
                year: 2020
            }
        ]
    }

    get(id: number): CarInterface | undefined {
        return this.carList.find(car => car.id === id);
    }
}

class CarApiProxy implements CarApiInterface {
    isAuthorized: boolean;
    carApi: CarApiInterface;
    
    constructor(isAuthorized: boolean) {
        this.isAuthorized = isAuthorized;
        this.carApi = new CarApi();
    }
    
    get(id: number) {
        if (this.isAuthorized) {
            return this.carApi.get(id);
        }
        
        return new Error('You are not authorized to make a call to api')
    }
}

(() => {
    const isAuthorized = false;
    const carApiProxy = new CarApiProxy(isAuthorized);
    const car = carApiProxy.get(1);
    
    console.log(car);
})()
