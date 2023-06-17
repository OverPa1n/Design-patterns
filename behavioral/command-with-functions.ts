/*
    The Command pattern is a design pattern that allows you to encapsulate a specific action or request as an object.
     This object can be passed around, stored, and executed at a later time. It helps decouple the sender of a request from the receiver,
     allowing for more flexibility and extensibility in handling requests.
 */

type CommandFunction<State> = (state: State) => [State, (state: State) => State];

function createCommandStack<State>(state: State) {
    const stack: ((state: State) => State)[] = [];
    let _state = state;

    return {
        execute(command: CommandFunction<State>) {
            const [newState, undoFunction] = command(_state);

            _state = newState;
            stack.push(undoFunction);

            return _state;
        },
        undo() {
            const command = stack.pop();

            if (command) {
                _state = command(_state);
            }

            return _state;
        }
    }
}

const addOne: CommandFunction<number> = (state) => [state + 1, (state) => state - 1];
const subtractOne: CommandFunction<number> = (state) => [state - 1, (state) => state + 1];
const setValue = (value: number): CommandFunction<number> => {
    return (state: number) => {
        const originalState = state;

        return [value, () => originalState];
    }
}
const commandStack = createCommandStack(0);
console.log(commandStack.execute(addOne));
console.log(commandStack.execute(addOne));
console.log(commandStack.execute(subtractOne));
console.log(commandStack.undo());
console.log(commandStack.execute(setValue(12)));
console.log(commandStack.undo());

