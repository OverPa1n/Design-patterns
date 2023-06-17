/*
    The composite pattern is a structural design pattern designed to represent tree-like structures,
    treating leaf and composite classes the same, usually by implementing a component interface in both

    A tree control is a perfect example of a Composite pattern.
    The nodes of the tree either contain an individual object (leaf node) or a group of objects (a subtree of nodes).

    Component: This is the abstract base class for all components in the tree structure. It defines the interface that all components must implement.
    Leaf: This represents a single object in the tree structure that does not have any children. It implements the Component interface.
    Composite: This represents a group of objects in the tree structure. It also implements the Component interface, but it can have child components.
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
// Abstract Component
var Chat = /** @class */ (function () {
    function Chat() {
    }
    Chat.prototype.addIdentities = function (ident) {
        var separator = '';
        for (var i = 0; i < ident; i++) {
            separator += '-';
        }
        return separator;
    };
    return Chat;
}());
// Component that can have a children components
var ChatRoom = /** @class */ (function (_super) {
    __extends(ChatRoom, _super);
    function ChatRoom(roomName) {
        var _this = _super.call(this) || this;
        _this.roomName = roomName;
        _this.name = roomName;
        _this.roomMessages = [];
        return _this;
    }
    ChatRoom.prototype.addMessage = function (message) {
        this.roomMessages.push(message);
    };
    ChatRoom.prototype.printMessages = function (ident) {
        if (ident === void 0) { ident = 0; }
        console.log("".concat(this.addIdentities(ident + 1), " Room name: ").concat(this.name));
        for (var _i = 0, _a = this.roomMessages; _i < _a.length; _i++) {
            var message = _a[_i];
            message.printMessages(ident + 1);
        }
    };
    return ChatRoom;
}(Chat));
// Leaf: Standalone object
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message(message) {
        var _this = _super.call(this) || this;
        _this.message = message;
        return _this;
    }
    Message.prototype.printMessages = function (ident) {
        if (ident === void 0) { ident = 0; }
        console.log("Message: ".concat(this.addIdentities(ident), " ").concat(this.message));
    };
    return Message;
}(Chat));
function composite() {
    var chat = new ChatRoom('Room 1');
    chat.addMessage(new Message('Hello'));
    chat.addMessage(new Message('Hi!'));
    var privateRoom = new ChatRoom('Private room');
    privateRoom.addMessage(new Message('Message from private room 1'));
    privateRoom.addMessage(new Message('Message from private room 2'));
    var privateRoom2 = new ChatRoom('Private room 2');
    privateRoom2.addMessage(new Message('I have some news'));
    privateRoom2.addMessage(new Message('Really? Tell me now!'));
    privateRoom.addMessage(privateRoom2);
    var friendsChat = new ChatRoom('Room for friends');
    friendsChat.addMessage(new Message('Hello Mike!'));
    friendsChat.addMessage(new Message('Hi John!'));
    chat.addMessage(privateRoom);
    chat.addMessage(friendsChat);
    chat.printMessages();
}
composite();
