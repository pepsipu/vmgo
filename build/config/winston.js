"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressLogger = exports.logger = void 0;
var winston_1 = __importDefault(require("winston"));
var chalk_1 = __importDefault(require("chalk"));
var formatInfo = function (info) {
    return "[" + info.level + ": " + chalk_1.default.yellow(info.timestamp) + "] " + info.message;
};
var levels = {
    error: 0,
    warn: 1,
    info: 2,
    request: 3,
    verbose: 4,
    debug: 5,
};
winston_1.default.addColors({
    request: 'cyan',
});
exports.logger = winston_1.default.createLogger({
    levels: levels,
    level: 'request',
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), winston_1.default.format.printf(formatInfo)),
    transports: [
        new winston_1.default.transports.File({
            format: winston_1.default.format.uncolorize(),
            filename: 'logs/log.log',
        }),
    ],
});
if (process.env.NODE_ENV === 'debug') {
    exports.logger.add(new winston_1.default.transports.Console());
}
function expressLogger(req, res, next) {
    exports.logger.log({
        message: chalk_1.default.blue(req.method) + " " + chalk_1.default.green(req.url) + " from " + chalk_1.default.magenta(req.connection.remoteAddress) + ":" + chalk_1.default.red(req.connection.remotePort),
        level: 'request',
    });
    next();
}
exports.expressLogger = expressLogger;
