var LegacyLogger = /** @class */ (function () {
    function LegacyLogger() {
    }
    LegacyLogger.prototype.write = function (msg) {
        console.log("[Legacy]:", msg);
    };
    return LegacyLogger;
}());
var LoggerAdapter = /** @class */ (function () {
    function LoggerAdapter(lagacyLogger) {
        this.lagacyLogger = lagacyLogger;
    }
    LoggerAdapter.prototype.log = function (message) {
        this.lagacyLogger.write(message);
    };
    return LoggerAdapter;
}());
// Usage
var logger = new LoggerAdapter(new LegacyLogger());
logger.log("Hello World");
