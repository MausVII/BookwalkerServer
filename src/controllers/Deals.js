"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeals = exports.getDiscountedBooks = exports.getCoinBackBooks = exports.getFreeBooks = exports.getDeals = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const data_source_1 = require("../data-source");
const Book_1 = require("../entity/Book");
const Deal_1 = require("../entity/Deal");
const getDeals = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const deals = yield data_source_1.AppDataSource.getRepository(Deal_1.Deal).find({
        relations: {
            books: true
        }
    });
    res.status(200).send(deals);
});
exports.getDeals = getDeals;
const getFreeBooks = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const deal = yield data_source_1.AppDataSource.getRepository(Deal_1.Deal).findOne({
        where: {
            type: (0, typeorm_1.Equal)("Discount"),
            amount: (0, typeorm_1.Equal)(1)
        },
        relations: {
            books: true
        }
    });
    const books = deal === null || deal === void 0 ? void 0 : deal.books;
    res.status(200).send(books);
});
exports.getFreeBooks = getFreeBooks;
const getCoinBackBooks = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const deal = yield data_source_1.AppDataSource.getRepository(Deal_1.Deal).findOne({
        where: {
            type: (0, typeorm_1.Equal)("Coin Back"),
        },
        relations: {
            books: true
        }
    });
    const books = deal === null || deal === void 0 ? void 0 : deal.books;
    res.status(200).send(books);
});
exports.getCoinBackBooks = getCoinBackBooks;
const getDiscountedBooks = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const deal = yield data_source_1.AppDataSource.getRepository(Deal_1.Deal).findOne({
        where: {
            type: (0, typeorm_1.Equal)("Discount"),
            amount: (0, typeorm_1.LessThan)(1.0)
        },
        relations: {
            books: true
        }
    });
    const books = deal === null || deal === void 0 ? void 0 : deal.books;
    res.status(200).send(books);
});
exports.getDiscountedBooks = getDiscountedBooks;
const createDeals = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const book = yield data_source_1.AppDataSource.getRepository(Book_1.Book).findOne({
        where: {
            id: (0, typeorm_1.Equal)(17)
        }
    });
    const deal = yield data_source_1.AppDataSource.getRepository(Deal_1.Deal).findOne({
        where: {
            id: (0, typeorm_1.Equal)(1)
        }
    });
    deal.books = [book];
    yield data_source_1.AppDataSource.manager.save(deal);
    book.deal = deal;
    yield data_source_1.AppDataSource.manager.save(book);
    // books.forEach( async book => {
    //     book.deal = deal!
    //     await AppDataSource.manager.save(book)
    // })
    res.status(200).send({ message: "Success" });
});
exports.createDeals = createDeals;
