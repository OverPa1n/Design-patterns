/*
    The Adapter pattern translates one interface (an object‘s properties and methods) to another.
    Adapters allows programming components to work together that otherwise wouldn't because of mismatched interfaces.
    The Adapter pattern is also referred to as the Wrapper Pattern.

    The Adapter pattern lets you create a middle-layer class that serves as a translator between your code and a legacy class,
    a 3rd-party class or any other class with a weird interface.
 */

interface LoggerInterface {
    sendLog: (log: string) => void;
}

// Old implementation
class Logger implements LoggerInterface {
    sendLog(log: string) {
        console.log('log:', log);
    }
}

// New implementation
class newLogger {
    // additional logic

    convertMsg(msg: string) {
        // additional logic
        return `Converted message from new logger: ${msg}`;
    }
}

class LoggerAdapter implements LoggerInterface {
    logger: any;
    newLogger: any;

    constructor(logger: any) {
        this.logger = logger;
        this.newLogger = new newLogger();
    }

    sendLog(msg: string) {
        // additional logic
        const newMsg = this.newLogger.convertMsg(msg);

        this.logger.sendLog(newMsg);
    }
}

class App {
    loggerAdapter: any;

    constructor(adapter: any) {
        this.loggerAdapter = adapter;
    }

    initApp() {
        console.log('App is initializing...');
        this.loggerAdapter.sendLog('app is initialized');
    }
}

const logger = new Logger();
// We can pass now any logger that we implement, the interface for logger always will be the same in LoggerAdapter class
const loggerAdapter = new LoggerAdapter(logger);
const app = new App(loggerAdapter);

app.initApp();
