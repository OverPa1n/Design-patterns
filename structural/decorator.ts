/**
 * A decorator is a structural design pattern that allows new behavior to be dynamically given to an object without affecting other classes.
 */
interface ComputerPartInterface {
    getName: Function;
    getPrice: Function;
}

abstract class PartDecorator implements ComputerPartInterface {
    protected computerPart: ComputerPartInterface;

    protected constructor(computerPart: ComputerPartInterface) {
        this.computerPart = computerPart;
    }

    getName() {
        this.computerPart.getName();
    }

    getPrice() {
        this.computerPart.getPrice();
    }
}

class ComputerBox implements ComputerPartInterface {
    getName() {
        return 'Empty computer box';
    }

    getPrice() {
        return 50;
    }
}

class MotherBoard extends PartDecorator {
    constructor(computerPart: ComputerPartInterface) {
        super(computerPart);
    }

    getName() {
        return `${this.computerPart.getName()} + Motherboard`;
    }

    getPrice() {
        return this.computerPart.getPrice() + 40;
    }
}

class Processor extends PartDecorator {
    constructor(computerPart: ComputerPartInterface) {
        super(computerPart);
    }

    getName() {
        return `${this.computerPart.getName()} + Processor`;
    }

    getPrice() {
        return this.computerPart.getPrice() + 120;
    }
}

class Ram extends PartDecorator {
    constructor(computerPart: ComputerPartInterface) {
        super(computerPart);
    }

    getPrice() {
        return this.computerPart.getPrice() + 60;
    }

    getName() {
        return `${this.computerPart.getName()} + Ram`;
    }
}

class Logger {
    computerPart: ComputerPartInterface;

    constructor(computerPart: ComputerPartInterface) {
        this.computerPart = computerPart;
    }

    log() {
        console.log(`Price: $${this.computerPart.getPrice()}`);
        console.log(`Parts: ${this.computerPart.getName()}`);
    }
}

const emptyBox = new ComputerBox();
console.log(emptyBox.getName());
const withMotherBoard = new MotherBoard(emptyBox);
const withProcessor = new Processor(withMotherBoard);
const withRam1 = new Ram(withProcessor);
const withRam2 = new Ram(withRam1);

const logger = new Logger(withRam2);
logger.log();
