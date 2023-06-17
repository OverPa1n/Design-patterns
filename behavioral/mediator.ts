/*
The mediator pattern is a behavioral design pattern that promotes loose coupling between objects by introducing
    a mediator object that encapsulates the communication logic between them.
This pattern helps to reduce the direct dependencies between objects and enables them to communicate with each other in
    a more indirect and decoupled manner.
*/
interface Chatroom {
    sendToAll: (username: string, message: string) => void;
    sendTo: (fromWho: string, toWhom: string, message: string) => void;
    addUser: (user) => void;
}

interface UserInterface {
    receiveMessage: (username: string, message: string) => void;
    name: string;
}

class Mediator implements Chatroom {
    users: {[key: string]: UserInterface} = {};

    addUser(user: UserInterface) {
        this.users[user.name] = user;
    }

    sendToAll(fromWho, message) {
        Object.entries(this.users).forEach(([name, user]) => {
            if (name !== fromWho) {
                user.receiveMessage(fromWho, message);
            }
        })
    }

    sendTo(fromWho, toWhom, message) {
        this.users[toWhom].receiveMessage(fromWho, message);
    }
}

class User implements UserInterface {
    name;

    constructor(name) {
        this.name = name;
    }

    receiveMessage(username, message) {
        console.log(`You receive message from ${username}: ${message}`);
    }
}

const mediator = new Mediator();
const user1 = new User('Nazar');
const user2 = new User('Ivan');
const user3 = new User('Max');

mediator.addUser(user1);
mediator.addUser(user2);
mediator.addUser(user3);

mediator.sendToAll('Nazar', 'Hello everybody')
mediator.sendTo('Ivan', 'Nazar', 'Hello!!!')
mediator.sendTo('Nazar', 'Max', 'Hello Max')
