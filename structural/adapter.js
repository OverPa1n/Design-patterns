/*
    The Adapter pattern translates one interface (an object‘s properties and methods) to another.
    Adapters allows programming components to work together that otherwise wouldn't because of mismatched interfaces.
    The Adapter pattern is also referred to as the Wrapper Pattern.

    The Adapter pattern lets you create a middle-layer class that serves as a translator between your code and a legacy class,
    a 3rd-party class or any other class with a weird interface.
 */
// Old implementation
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.sendLog = function (log) {
        console.log('log:', log);
    };
    return Logger;
}());
// New implementation
var newLogger = /** @class */ (function () {
    function newLogger() {
    }
    // additional logic
    newLogger.prototype.convertMsg = function (msg) {
        // additional logic
        return "Converted message from new logger: ".concat(msg);
    };
    return newLogger;
}());
var LoggerAdapter = /** @class */ (function () {
    function LoggerAdapter(logger) {
        this.logger = logger;
        this.newLogger = new newLogger();
    }
    LoggerAdapter.prototype.sendLog = function (msg) {
        // additional logic
        var newMsg = this.newLogger.convertMsg(msg);
        this.logger.sendLog(newMsg);
    };
    return LoggerAdapter;
}());
var App = /** @class */ (function () {
    function App(adapter) {
        this.loggerAdapter = adapter;
    }
    App.prototype.initApp = function () {
        console.log('App is initializing...');
        this.loggerAdapter.sendLog('app is initialized');
    };
    return App;
}());
var logger = new Logger();
// We can pass now any logger that we implement, the interface for logger always will be the same in LoggerAdapter class
var loggerAdapter = new LoggerAdapter(logger);
var app = new App(loggerAdapter);
app.initApp();
