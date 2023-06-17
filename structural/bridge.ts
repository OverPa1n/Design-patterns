/*
    The Bridge pattern is a way to decouple an abstraction from its implementation,
     allowing them to vary independently and making it easier to maintain and extend your code.
     It facilitates very loose coupling of objects.

     Its main goal is to write better code through two levels of abstraction.

     The roles of the bridge pattern are:
        Abstraction: an abstract class that holds an instance of the implementor.
        Implementor: an interface that introduces variability in the abstraction.
        Concrete Abstraction: a class that extends the abstraction interface.
        Concrete Implementor: a class that implements the implementor interface.
 */

// Abstract level
// Abstraction
abstract class Database {
    protected instance: InstanceInterface;

    protected constructor(instance: InstanceInterface) {
        this.instance = instance;
    }

    abstract makeRequest(): void;
}

// Implementation level
// Implementor
interface InstanceInterface {
    getData: () => void;
}

// Concrete implementor
class MongoInstance implements InstanceInterface {
    getData() {
        console.log('Get date from mongo instance');
    }
}

class MySqlInstance implements InstanceInterface {
    getData() {
        console.log('Get date from MySql instance');
    }
}

// Concrete abstraction
class MyDatabase extends Database {
    constructor(instance: InstanceInterface) {
        super(instance);
    }

    makeRequest() {
        //Additional logic
        this.instance.getData();
    }
}

const mongoInstance = new MongoInstance();
const mySqlInstance = new MySqlInstance();
const database = new MyDatabase(mongoInstance);

database.makeRequest();
