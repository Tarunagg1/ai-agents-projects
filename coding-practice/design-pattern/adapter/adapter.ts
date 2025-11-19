// Target interface
interface Logger {
    log(message: string): void;
}


class LegacyLogger {
    write(msg: string) {
        console.log("[Legacy]:", msg);
    }
}


class LoggerAdapter implements Logger {
    constructor(private lagacyLogger: LegacyLogger) {
    }

    log(message: string): void {
        this.lagacyLogger.write(message);
    }
}

// Usage
const logger: Logger = new LoggerAdapter(new LegacyLogger());
logger.log("Hello World");

