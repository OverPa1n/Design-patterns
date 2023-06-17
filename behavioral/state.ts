/**
 * The state pattern is a behavioral design pattern that allows an object to change its behavior based on its internal state.
 * It provides a way to manage complex behaviors by encapsulating them in separate state objects and allowing the object to switch between those states dynamically.
 */

interface VendingMachineState {
    selectItem(item: string): void;
    insertMoney(amount: number): void;
    dispenseItem(): void;
}

class ReadyModeState implements VendingMachineState {
    vendingMachine: VendingMachine;

    constructor(vendingMachine: VendingMachine) {
        this.vendingMachine = vendingMachine;
    }

    selectItem(item: string): void {
        this.vendingMachine.setSelectedItem(item);
        console.log(`Item "${item}" selected.`);
        this.vendingMachine.changeState(new SelectionMadeState(this.vendingMachine));
    }

    insertMoney(amount: number): void {
        console.log("Please select an item before inserting money.");
    }

    dispenseItem(): void {
        console.log("Please select an item and insert money before dispensing.");
    }
}

class SelectionMadeState implements VendingMachineState {
    vendingMachine: VendingMachine;

    constructor(vendingMachine: VendingMachine) {
        this.vendingMachine = vendingMachine;
    }

    selectItem(item: string): void {
        console.log("You have already selected an item.");
    }

    insertMoney(amount: number): void {
        this.vendingMachine.addMoney(amount);
        console.log(`$${amount} inserted.`);
        this.vendingMachine.changeState(new DispensingState(this.vendingMachine));
    }

    dispenseItem(): void {
        console.log("Please insert money before dispensing.");
    }
}

class DispensingState implements VendingMachineState {
    vendingMachine: VendingMachine;

    constructor(vendingMachine: VendingMachine) {
        this.vendingMachine = vendingMachine;
    }

    selectItem(item: string): void {
        console.log("Please wait, dispensing item.");
    }

    insertMoney(amount: number): void {
        console.log("Please wait, dispensing item.");
    }

    dispenseItem(): void {
        const selectedItem = this.vendingMachine.getSelectedItem();
        const amountInserted = this.vendingMachine.getAmountInserted();

        if (selectedItem && amountInserted >= selectedItem.price) {
            console.log(`Dispensing item "${selectedItem.name}".`);
            this.vendingMachine.subtractStock(selectedItem);
            this.vendingMachine.subtractMoney(selectedItem.price);
            if (this.vendingMachine.getAmountInserted() > 0) {
                console.log(`Returning change: $${this.vendingMachine.getAmountInserted()}.`);
                this.vendingMachine.resetAmountInserted();
            }
            this.vendingMachine.changeState(new ReadyModeState(this.vendingMachine));
        } else {
            console.log("Insufficient funds. Please insert more money.");
        }
    }
}

// Context
class VendingMachine {
    private selectedItem: { name: string; price: number } | null;
    private amountInserted: number;
    private stock: { name: string; price: number; quantity: number }[];
    private state: VendingMachineState;

    constructor(stock: { name: string; price: number; quantity: number }[]) {
        this.selectedItem = null;
        this.amountInserted = 0;
        this.stock = stock;
        this.state = new ReadyModeState(this);
    }

    changeState(newState: VendingMachineState): void {
        this.state = newState;
    }

    setSelectedItem(item: string): void {
        this.selectedItem = this.stock.find((stockItem) => stockItem.name === item) || null;
    }

    getSelectedItem(): { name: string; price: number } | null {
        return this.selectedItem;
    }

    addMoney(amount: number): void {
        this.amountInserted += amount;
    }

    subtractMoney(amount: number): void {
        this.amountInserted -= amount;
    }

    getAmountInserted(): number {
        return this.amountInserted;
    }

    resetAmountInserted(): void {
        this.amountInserted = 0;
    }

    subtractStock(item: { name: string; price: number }): void {
        const itemIndex = this.stock.findIndex((stockItem) => stockItem.name === item.name);
        if (itemIndex !== -1) {
            this.stock[itemIndex].quantity -= 1;
        }
    }

    dispenseItem(): void {
        this.state.dispenseItem();
    }

    insertMoney(amount: number): void {
        this.state.insertMoney(amount);
    }

    selectItem(item: string): void {
        this.state.selectItem(item);
    }

    displayStock(): void {
        console.log("Available items:");
        this.stock.forEach((item) => {
            console.log(`${item.name} - $${item.price} - Quantity: ${item.quantity}`);
        });
    }
}

// Usage example
const stock = [
    { name: "Coke", price: 1.5, quantity: 5 },
    { name: "Chips", price: 1, quantity: 10 },
    { name: "Candy", price: 0.75, quantity: 3 },
];

const vendingMachine = new VendingMachine(stock);

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

