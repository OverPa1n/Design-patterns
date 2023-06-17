var Mediator = /** @class */ (function () {
    function Mediator() {
        this.users = {};
    }
    Mediator.prototype.addUser = function (user) {
        this.users[user.name] = user;
    };
    Mediator.prototype.sendToAll = function (fromWho, message) {
        Object.entries(this.users).forEach(function (_a) {
            var name = _a[0], user = _a[1];
            if (name !== fromWho) {
                user.receiveMessage(fromWho, message);
            }
        });
    };
    Mediator.prototype.sendTo = function (fromWho, toWhom, message) {
        this.users[toWhom].receiveMessage(fromWho, message);
    };
    return Mediator;
}());
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    User.prototype.receiveMessage = function (username, message) {
        console.log("You receive message from ".concat(username, ": ").concat(message));
    };
    return User;
}());
var mediator = new Mediator();
var user1 = new User('Nazar');
var user2 = new User('Ivan');
var user3 = new User('Max');
mediator.addUser(user1);
mediator.addUser(user2);
mediator.addUser(user3);
mediator.sendToAll('Nazar', 'Hello everybody');
mediator.sendTo('Ivan', 'Nazar', 'Hello!!!');
mediator.sendTo('Nazar', 'Max', 'Hello Max');
