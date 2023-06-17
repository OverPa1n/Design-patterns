/**
 * The visitor pattern is a design pattern that allows you to separate the operations performed on a set of objects from the objects themselves.
 * It enables you to add new operations without modifying the classes of those objects.
 */
// Animal interface
interface Animal {
    accept(visitor: AnimalVisitor): void;
}

// Concrete animal classes
class Lion implements Animal {
    accept(visitor: AnimalVisitor): void {
        visitor.visitLion(this);
    }

    roar(): void {
        console.log("The lion roars!");
    }
}

class Tiger implements Animal {
    accept(visitor: AnimalVisitor): void {
        visitor.visitTiger(this);
    }

    growl(): void {
        console.log("The tiger growls!");
    }
}

class Bear implements Animal {
    accept(visitor: AnimalVisitor) {
        visitor.visitBear(this);
    }

    standsOnLegs() {
        console.log("The bear stands on two legs and looks tall");
    }
}

// Animal Visitor interface
interface AnimalVisitor {
    visitLion(lion: Lion): void;
    visitTiger(tiger: Tiger): void;
    visitBear(bear: Bear): void;
}

// Concrete visitor classes
class FeedingVisitor implements AnimalVisitor {
    visitLion(lion: Lion): void {
        console.log("Feeding the lion.");
        lion.roar();
    }

    visitTiger(tiger: Tiger): void {
        console.log("Feeding the tiger.");
        tiger.growl();
    }

    visitBear(bear: Bear) {
        console.log(`Bear, let's stay on two legs`);
        bear.standsOnLegs();
    }
}

class HealthCheckVisitor implements AnimalVisitor {
    visitLion(lion: Lion): void {
        console.log("Performing health check on the lion.");
        lion.roar();
    }

    visitTiger(tiger: Tiger): void {
        console.log("Performing health check on the tiger.");
        tiger.growl();
    }

    visitBear(bear: Bear) {
        console.log(`Bear, let's stay on two legs`);
        bear.standsOnLegs();
    }
}

// Usage
const lion = new Lion();
const tiger = new Tiger();
const bear = new Bear();

const feedingVisitor = new FeedingVisitor();
const healthCheckVisitor = new HealthCheckVisitor();

lion.accept(feedingVisitor);
tiger.accept(feedingVisitor);
bear.accept(feedingVisitor);

console.log("------");

lion.accept(healthCheckVisitor);
tiger.accept(healthCheckVisitor);
bear.accept(healthCheckVisitor);
