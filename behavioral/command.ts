/*
    The Command pattern is a design pattern that allows you to encapsulate a specific action or request as an object.
     This object can be passed around, stored, and executed at a later time. It helps decouple the sender of a request from the receiver,
     allowing for more flexibility and extensibility in handling requests.
 */
abstract class Command<State> {
    abstract execute(state: State): State;
    abstract undo(state: State): State;
}

class CommandStack<State> {
    private stack: Command<State>[] = [];

    constructor(private _state: State) {
    }
    
    get state() {
        return this._state;
    }
    
    execute(command: Command<State>) {
        this._state = command.execute(this._state);
        this.stack.push(command);
    }

    undo() {
        const command = this.stack.pop();

        if (command) {
            this._state = command.undo(this._state);
        }
    }
}

class AddOne extends Command<number> {
    execute(state: number): number {
        return state + 1;
    }

    undo(state: number): number {
        return state - 1;
    }
}

class SetValue extends Command<number> {
    private _originalValue?: number;

    constructor(private value: number) {
        super();
    }

    execute(state: number): number {
        this._originalValue = state;
        return this.value;
    }

    undo(state: number): number {
        return this._originalValue!;
    }
}

const cs = new CommandStack(0);
console.log(cs.state);
cs.execute(new AddOne());
cs.undo()
cs.execute(new SetValue(42))
console.log(cs.state);
cs.undo()
console.log(cs.state);
