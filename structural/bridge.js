/*
    The Bridge pattern is a way to decouple an abstraction from its implementation,
     allowing them to vary independently and making it easier to maintain and extend your code.

     The roles of the bridge pattern are:

        Abstraction: an abstract class that holds an instance of the implementor.
        Implementor: an interface that introduces variability in the abstraction.
        Concrete Abstraction: a class that extends the abstraction interface.
        Concrete Implementor: a class that implements the implementor interface.
 */
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
// Abstract level
// Abstraction
var Database = /** @class */ (function () {
    function Database(instance) {
        this.instance = instance;
    }
    return Database;
}());
// Concrete implementor
var MongoInstance = /** @class */ (function () {
    function MongoInstance() {
    }
    MongoInstance.prototype.getData = function () {
        console.log('Get date from mongo instance');
    };
    return MongoInstance;
}());
var MySqlInstance = /** @class */ (function () {
    function MySqlInstance() {
    }
    MySqlInstance.prototype.getData = function () {
        console.log('Get date from MySql instance');
    };
    return MySqlInstance;
}());
// Concrete abstraction
var MyDatabase = /** @class */ (function (_super) {
    __extends(MyDatabase, _super);
    function MyDatabase(instance) {
        return _super.call(this, instance) || this;
    }
    MyDatabase.prototype.makeRequest = function () {
        //Additional logic
        this.instance.getData();
    };
    return MyDatabase;
}(Database));
var mongoInstance = new MongoInstance();
var mySqlInstance = new MySqlInstance();
var database = new MyDatabase(mongoInstance);
database.makeRequest();
