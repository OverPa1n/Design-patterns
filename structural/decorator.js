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
var PartDecorator = /** @class */ (function () {
    function PartDecorator(computerPart) {
        this.computerPart = computerPart;
    }
    PartDecorator.prototype.getName = function () {
        this.computerPart.getName();
    };
    PartDecorator.prototype.getPrice = function () {
        this.computerPart.getPrice();
    };
    return PartDecorator;
}());
var ComputerBox = /** @class */ (function () {
    function ComputerBox() {
    }
    ComputerBox.prototype.getName = function () {
        return 'Empty computer box';
    };
    ComputerBox.prototype.getPrice = function () {
        return 50;
    };
    return ComputerBox;
}());
var MotherBoard = /** @class */ (function (_super) {
    __extends(MotherBoard, _super);
    function MotherBoard(computerPart) {
        return _super.call(this, computerPart) || this;
    }
    MotherBoard.prototype.getName = function () {
        return "".concat(this.computerPart.getName(), " + Motherboard");
    };
    MotherBoard.prototype.getPrice = function () {
        return this.computerPart.getPrice() + 40;
    };
    return MotherBoard;
}(PartDecorator));
var Processor = /** @class */ (function (_super) {
    __extends(Processor, _super);
    function Processor(computerPart) {
        return _super.call(this, computerPart) || this;
    }
    Processor.prototype.getName = function () {
        return "".concat(this.computerPart.getName(), " + Processor");
    };
    Processor.prototype.getPrice = function () {
        return this.computerPart.getPrice() + 120;
    };
    return Processor;
}(PartDecorator));
var Ram = /** @class */ (function (_super) {
    __extends(Ram, _super);
    function Ram(computerPart) {
        return _super.call(this, computerPart) || this;
    }
    Ram.prototype.getPrice = function () {
        return this.computerPart.getPrice() + 60;
    };
    Ram.prototype.getName = function () {
        return "".concat(this.computerPart.getName(), " + Ram");
    };
    return Ram;
}(PartDecorator));
var Logger = /** @class */ (function () {
    function Logger(computerPart) {
        this.computerPart = computerPart;
    }
    Logger.prototype.log = function () {
        console.log("Price: $".concat(this.computerPart.getPrice()));
        console.log("Parts: ".concat(this.computerPart.getName()));
    };
    return Logger;
}());
var emptyBox = new ComputerBox();
console.log(emptyBox.getName());
var withMotherBoard = new MotherBoard(emptyBox);
var withProcessor = new Processor(withMotherBoard);
var withRam1 = new Ram(withProcessor);
var withRam2 = new Ram(withRam1);
var logger = new Logger(withRam2);
logger.log();
