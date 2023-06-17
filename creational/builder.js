/*
    The Builder pattern allows a client to construct a complex object by specifying the type and content only.
     Construction details are hidden from the client entirely.

     The most common motivation for using Builder is to simplify client code that creates complex objects.
 */

// The class has construct method that perform constructing of some complex objects
class Director {
    construct(builder) {
        builder.step1();
        builder.step2();

        return builder.get();
    }
}

// Builder it is a class that encapsulate assembly steps of object
class Builder1 {
    product;

    step1() {
        console.log('Perform step 1');
        this.product = new Car1();
    }

    step2() {
        console.log('Perform step 2');
    }

    get() {
        console.log('Return product');
        return this.product;
    }
}

// Builder it is a class that encapsulate assembly steps of object
class Builder2 {
    product;

    step1() {
        console.log('Perform step 1');
        this.product = new Car2();
    }

    step2() {
        console.log('Perform step 2');
    }

    get() {
        console.log('Return product');
        return this.product;
    }
}

// The class is our product that we create and return in builder
class Car1 {
    constructor() {
        this.name = 'car1';
    }
}

// The class is our product that we create and return in builder
class Car2 {
    constructor() {
        this.name = 'car2';
    }
}

const director = new Director();
const builder1 = new Builder1();
const builder2 = new Builder2();

[builder1, builder2].forEach(builder => {
    console.log(director.construct(builder));
})
