"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require('dotenv').config();
const express_1 = tslib_1.__importDefault(require("express"));
const data_source_1 = require("./data-source");
const routes_1 = require("./routes");
const cors_1 = tslib_1.__importDefault(require("cors"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log("Data source has been initialized.");
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cors_1.default)({
        origin: true,
        // Allow sending/receiving cookies
        credentials: true
    }));
    app.use((0, cookie_parser_1.default)());
    (0, routes_1.routes)(app);
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}.`);
    });
})
    .catch(error => {
    console.error(error);
});
