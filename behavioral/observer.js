/*
    An observer is an object that receives updates from another object known as a subject.
    A subject is able to send updates out to many observers much like a weather station is able to
    send out text and email alerts to people who have subscribed to receive them.
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
var MasterSwitch = /** @class */ (function () {
    function MasterSwitch() {
        this.observers = [];
    }
    MasterSwitch.prototype.notifyObservers = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var o = _a[_i];
            o.update();
        }
    };
    MasterSwitch.prototype.addObserver = function (o) {
        this.observers.push(o);
    };
    MasterSwitch.prototype.flip = function (state) {
        this.state = state;
        this.notifyObservers();
    };
    MasterSwitch.prototype.getState = function () {
        return this.state;
    };
    return MasterSwitch;
}());
var ElectricalObject = /** @class */ (function () {
    function ElectricalObject(subject) {
        this.subject = subject;
        subject.addObserver(this);
    }
    ElectricalObject.prototype.update = function () {
        this.setSwitch(this.subject.getState());
    };
    return ElectricalObject;
}());
var CeilingFan = /** @class */ (function (_super) {
    __extends(CeilingFan, _super);
    function CeilingFan(subject) {
        return _super.call(this, subject) || this;
    }
    CeilingFan.prototype.setSwitch = function (state) {
        if (this.isOn !== state) {
            this.isOn = state;
            console.log("Fan turned ".concat(this.isOn ? 'on' : 'off'));
        }
    };
    return CeilingFan;
}(ElectricalObject));
var masterSwitch = new MasterSwitch();
var lamp = new CeilingFan(masterSwitch);
masterSwitch.flip(true);
masterSwitch.flip(false);
