/*
    The composite pattern is a structural design pattern designed to represent tree-like structures,
    treating leaf and composite classes the same, usually by implementing a component interface in both

    A tree control is a perfect example of a Composite pattern.
    The nodes of the tree either contain an individual object (leaf node) or a group of objects (a subtree of nodes).

    Component: This is the abstract base class for all components in the tree structure. It defines the interface that all components must implement.
    Leaf: This represents a single object in the tree structure that does not have any children. It implements the Component interface.
    Composite: This represents a group of objects in the tree structure. It also implements the Component interface, but it can have child components.
 */

// Abstract Component
abstract class Chat {
    abstract printMessages(): void;

    addIdentities(ident) {
        let separator = '';

        for (let i = 0; i < ident; i++) {
            separator += '-'
        }

        return separator;
    }
}

// Component that can have a children components
class ChatRoom extends Chat {
    roomMessages: Array<Message | ChatRoom>;
    name: string;

    constructor(private roomName) {
        super();

        this.name = roomName;
        this.roomMessages = [];
    }

    addMessage(message) {
        this.roomMessages.push(message);
    }

    printMessages(ident = 0) {
        console.log(`${this.addIdentities(ident + 1)} Room name: ${this.name}`);
        for(let message of this.roomMessages) {
            message.printMessages(ident + 1);
        }
    }
}

// Leaf: Standalone object
class Message extends Chat {
    message;

    constructor(message) {
        super();

        this.message = message;
    }

    printMessages(ident = 0) {
        console.log(`Message: ${this.addIdentities(ident)} ${this.message}`);
    }
}

function composite() {
    const chat = new ChatRoom('Room 1');

    chat.addMessage(new Message('Hello'));
    chat.addMessage(new Message('Hi!'));

    const privateRoom = new ChatRoom('Private room');

    privateRoom.addMessage(new Message('Message from private room 1'));
    privateRoom.addMessage(new Message('Message from private room 2'));

    const privateRoom2 = new ChatRoom('Private room 2');

    privateRoom2.addMessage(new Message('I have some news'));
    privateRoom2.addMessage(new Message('Really? Tell me now!'));

    privateRoom.addMessage(privateRoom2);

    const friendsChat = new ChatRoom('Room for friends');
    friendsChat.addMessage(new Message('Hello Mike!'));
    friendsChat.addMessage(new Message('Hi John!'));

    chat.addMessage(privateRoom);
    chat.addMessage(friendsChat);
    chat.printMessages();
}

composite();
