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
    host: process.env.RDS_HOSTNAME,
    //@ts-ignore
    port: process.env.RDS_PORT,
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Book_1.Book, User_1.User, Publisher_1.Publisher, Genre_1.Genre, Series_1.Series, Deal_1.Deal],
    migrations: [],
    subscribers: [],
    extra: {
        decimalNumbers: true
    }
});
