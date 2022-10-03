import "reflect-metadata"
import { DataSource } from "typeorm"
import { Book } from "./entity/Book"
import { Deal } from "./entity/Deal"
import { Genre } from "./entity/Genre"
import { Publisher } from "./entity/Publisher"
import { Series } from "./entity/Series"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.HOST!,
    port: 3306,
    username: "admin",
    password: process.env.PASSWORD!,
    database: "Bookwalker",
    synchronize: true,
    logging: false,
    entities: [Book, User, Publisher, Genre, Series, Deal],
    migrations: [],
    subscribers: [],
    extra: {
        decimalNumbers: true
    }
})