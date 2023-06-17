/*
    The Command pattern is a design pattern that allows you to encapsulate a specific action or request as an object.
     This object can be passed around, stored, and executed at a later time. It helps decouple the sender of a request from the receiver,
     allowing for more flexibility and extensibility in handling requests.
 */
function createCommandStack(state) {
    var stack = [];
    var _state = state;
    return {
        execute: function (command) {
            var _a = command(_state), newState = _a[0], undoFunction = _a[1];
            _state = newState;
            stack.push(undoFunction);
            return _state;
        },
        undo: function () {
            var command = stack.pop();
            if (command) {
                _state = command(_state);
            }
            return _state;
        }
    };
}
var addOne = function (state) { return [state + 1, function (state) { return state - 1; }]; };
var subtractOne = function (state) { return [state - 1, function (state) { return state + 1; }]; };
var setValue = function (value) {
    return function (state) {
        var originalState = state;
        return [value, function () { return originalState; }];
    };
};
var commandStack = createCommandStack(0);
console.log(commandStack.execute(addOne));
console.log(commandStack.execute(addOne));
console.log(commandStack.execute(subtractOne));
console.log(commandStack.undo());
console.log(commandStack.execute(setValue(12)));
console.log(commandStack.undo());
