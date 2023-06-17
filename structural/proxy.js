/**
 * The Proxy pattern provides a surrogate or placeholder object for another object and controls access to this other object.
 * In other words, the proxy acts as an intermediary between the client and the actual object, intercepting requests and managing their execution.
 *
 * The main goal of the Proxy pattern is to add an extra layer of indirection to support additional features such as caching,
 * logging, access control, and performance optimization, without changing the underlying functionality of the actual object.
 */
var CarApi = /** @class */ (function () {
    function CarApi() {
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
        ];
    }
    CarApi.prototype.get = function (id) {
        return this.carList.find(function (car) { return car.id === id; });
    };
    return CarApi;
}());
var CarApiProxy = /** @class */ (function () {
    function CarApiProxy(isAuthorized) {
        this.isAuthorized = isAuthorized;
        this.carApi = new CarApi();
    }
    CarApiProxy.prototype.get = function (id) {
        if (this.isAuthorized) {
            return this.carApi.get(id);
        }
        return new Error('You are not authorized to make a call to api');
    };
    return CarApiProxy;
}());
(function () {
    var isAuthorized = false;
    var carApiProxy = new CarApiProxy(isAuthorized);
    var car = carApiProxy.get(1);
    console.log(car);
})();
