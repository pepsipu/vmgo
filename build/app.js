"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var chalk_1 = __importDefault(require("chalk"));
require("./config/env");
var winston_1 = require("./config/winston");
var router_1 = __importDefault(require("./routes/router"));
var app = express_1.default();
var port = +(process.env.PORT || 3000);
app.use(express_1.default.json());
app.use('/api', router_1.default);
app.use(winston_1.expressLogger);
app.listen(port, function () {
    winston_1.logger.info("Express server has started listening on port " + chalk_1.default.red(port) + ".");
});
