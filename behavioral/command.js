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
/*
    The Command pattern is a design pattern that allows you to encapsulate a specific action or request as an object.
     This object can be passed around, stored, and executed at a later time. It helps decouple the sender of a request from the receiver,
     allowing for more flexibility and extensibility in handling requests.
 */
var Command = /** @class */ (function () {
    function Command() {
    }
    return Command;
}());
var CommandStack = /** @class */ (function () {
    function CommandStack(_state) {
        this._state = _state;
        this.stack = [];
    }
    Object.defineProperty(CommandStack.prototype, "state", {
        get: function () {
            return this._state;
        },
        enumerable: false,
        configurable: true
    });
    CommandStack.prototype.execute = function (command) {
        this._state = command.execute(this._state);
        this.stack.push(command);
    };
    CommandStack.prototype.undo = function () {
        var command = this.stack.pop();
        if (command) {
            this._state = command.undo(this._state);
        }
    };
    return CommandStack;
}());
var AddOne = /** @class */ (function (_super) {
    __extends(AddOne, _super);
    function AddOne() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddOne.prototype.execute = function (state) {
        return state + 1;
    };
    AddOne.prototype.undo = function (state) {
        return state - 1;
    };
    return AddOne;
}(Command));
var SetValue = /** @class */ (function (_super) {
    __extends(SetValue, _super);
    function SetValue(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    SetValue.prototype.execute = function (state) {
        this._originalValue = state;
        return this.value;
    };
    SetValue.prototype.undo = function (state) {
        return this._originalValue;
    };
    return SetValue;
}(Command));
var cs = new CommandStack(0);
console.log(cs.state);
cs.execute(new AddOne());
cs.undo();
cs.execute(new SetValue(42));
console.log(cs.state);
cs.undo();
console.log(cs.state);
