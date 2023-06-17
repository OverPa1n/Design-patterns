/**
 * The state pattern is a behavioral design pattern that allows an object to change its behavior based on its internal state.
 * It provides a way to manage complex behaviors by encapsulating them in separate state objects and allowing the object to switch between those states dynamically.
 */
var ReadyModeState = /** @class */ (function () {
    function ReadyModeState(vendingMachine) {
        this.vendingMachine = vendingMachine;
    }
    ReadyModeState.prototype.selectItem = function (item) {
        this.vendingMachine.setSelectedItem(item);
        console.log("Item \"".concat(item, "\" selected."));
        this.vendingMachine.changeState(new SelectionMadeState(this.vendingMachine));
    };
    ReadyModeState.prototype.insertMoney = function (amount) {
        console.log("Please select an item before inserting money.");
    };
    ReadyModeState.prototype.dispenseItem = function () {
        console.log("Please select an item and insert money before dispensing.");
    };
    return ReadyModeState;
}());
var SelectionMadeState = /** @class */ (function () {
    function SelectionMadeState(vendingMachine) {
        this.vendingMachine = vendingMachine;
    }
    SelectionMadeState.prototype.selectItem = function (item) {
        console.log("You have already selected an item.");
    };
    SelectionMadeState.prototype.insertMoney = function (amount) {
        this.vendingMachine.addMoney(amount);
        console.log("$".concat(amount, " inserted."));
        this.vendingMachine.changeState(new DispensingState(this.vendingMachine));
    };
    SelectionMadeState.prototype.dispenseItem = function () {
        console.log("Please insert money before dispensing.");
    };
    return SelectionMadeState;
}());
var DispensingState = /** @class */ (function () {
    function DispensingState(vendingMachine) {
        this.vendingMachine = vendingMachine;
    }
    DispensingState.prototype.selectItem = function (item) {
        console.log("Please wait, dispensing item.");
    };
    DispensingState.prototype.insertMoney = function (amount) {
        console.log("Please wait, dispensing item.");
    };
    DispensingState.prototype.dispenseItem = function () {
        var selectedItem = this.vendingMachine.getSelectedItem();
        var amountInserted = this.vendingMachine.getAmountInserted();
        if (selectedItem && amountInserted >= selectedItem.price) {
            console.log("Dispensing item \"".concat(selectedItem.name, "\"."));
            this.vendingMachine.subtractStock(selectedItem);
            this.vendingMachine.subtractMoney(selectedItem.price);
            if (this.vendingMachine.getAmountInserted() > 0) {
                console.log("Returning change: $".concat(this.vendingMachine.getAmountInserted(), "."));
                this.vendingMachine.resetAmountInserted();
            }
            this.vendingMachine.changeState(new ReadyModeState(this.vendingMachine));
        }
        else {
            console.log("Insufficient funds. Please insert more money.");
        }
    };
    return DispensingState;
}());
// Context
var VendingMachine = /** @class */ (function () {
    function VendingMachine(stock) {
        this.selectedItem = null;
        this.amountInserted = 0;
        this.stock = stock;
        this.state = new ReadyModeState(this);
    }
    VendingMachine.prototype.changeState = function (newState) {
        this.state = newState;
    };
    VendingMachine.prototype.setSelectedItem = function (item) {
        this.selectedItem = this.stock.find(function (stockItem) { return stockItem.name === item; }) || null;
    };
    VendingMachine.prototype.getSelectedItem = function () {
        return this.selectedItem;
    };
    VendingMachine.prototype.addMoney = function (amount) {
        this.amountInserted += amount;
    };
    VendingMachine.prototype.subtractMoney = function (amount) {
        this.amountInserted -= amount;
    };
    VendingMachine.prototype.getAmountInserted = function () {
        return this.amountInserted;
    };
    VendingMachine.prototype.resetAmountInserted = function () {
        this.amountInserted = 0;
    };
    VendingMachine.prototype.subtractStock = function (item) {
        var itemIndex = this.stock.findIndex(function (stockItem) { return stockItem.name === item.name; });
        if (itemIndex !== -1) {
            this.stock[itemIndex].quantity -= 1;
        }
    };
    VendingMachine.prototype.dispenseItem = function () {
        this.state.dispenseItem();
    };
    VendingMachine.prototype.insertMoney = function (amount) {
        this.state.insertMoney(amount);
    };
    VendingMachine.prototype.selectItem = function (item) {
        this.state.selectItem(item);
    };
    VendingMachine.prototype.displayStock = function () {
        console.log("Available items:");
        this.stock.forEach(function (item) {
            console.log("".concat(item.name, " - $").concat(item.price, " - Quantity: ").concat(item.quantity));
        });
    };
    return VendingMachine;
}());
// Usage example
var stock = [
    { name: "Coke", price: 1.5, quantity: 5 },
    { name: "Chips", price: 1, quantity: 10 },
    { name: "Candy", price: 0.75, quantity: 3 },
];
var vendingMachine = new VendingMachine(stock);
vendingMachine.displayStock();
vendingMachine.selectItem("Coke");
vendingMachine.insertMoney(2);
vendingMachine.dispenseItem();
vendingMachine.selectItem("Coke");
vendingMachine.insertMoney(3);
vendingMachine.dispenseItem();
vendingMachine.displayStock();
//
// vendingMachine.selectItem("Chips");
// vendingMachine.insertMoney(1);
// vendingMachine.dispenseItem();
//
// vendingMachine.selectItem("Candy");
// vendingMachine.insertMoney(0.5);
// vendingMachine.dispenseItem();
