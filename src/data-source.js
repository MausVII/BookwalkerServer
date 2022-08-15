"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Book_1 = require("./entity/Book");
const Deal_1 = require("./entity/Deal");
const Genre_1 = require("./entity/Genre");
const Publisher_1 = require("./entity/Publisher");
const Series_1 = require("./entity/Series");
const User_1 = require("./entity/User");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "elan-puente.ciuso9aldwfa.us-east-1.rds.amazonaws.com",
    port: 3306,
    username: "admin",
    password: "nichinichisou0607",
    database: "Bookwalker",
    synchronize: true,
    logging: false,
    entities: [Book_1.Book, User_1.User, Publisher_1.Publisher, Genre_1.Genre, Series_1.Series, Deal_1.Deal],
    migrations: [],
    subscribers: [],
    extra: {
        decimalNumbers: true
    }
});
