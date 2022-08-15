"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPublishers = exports.getRecentPublisherBooks = exports.getPublisherBooks = exports.getPublisherData = exports.getPublishers = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const data_source_1 = require("../data-source");
const Publisher_1 = require("../entity/Publisher");
const getPublishers = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const publishers = yield data_source_1.AppDataSource.getRepository(Publisher_1.Publisher).find();
    res.status(200).send(publishers);
});
exports.getPublishers = getPublishers;
const getPublisherData = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let publisher_id = parseInt(req.params.id);
    let publisher = yield data_source_1.AppDataSource.getRepository(Publisher_1.Publisher).findOne({
        where: {
            id: (0, typeorm_1.Equal)(publisher_id)
        },
    });
    res.status(200).send(publisher);
});
exports.getPublisherData = getPublisherData;
const getPublisherBooks = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let id = parseInt(req.params.id);
    const publisher = yield data_source_1.AppDataSource.getRepository(Publisher_1.Publisher).findOne({
        where: {
            id: (0, typeorm_1.Equal)(id)
        },
        relations: {
            books: true
        }
    });
    if (!publisher)
        return res.status(400).send({ message: "Publisher not found" });
    const books = publisher.books;
    res.status(200).send(books);
});
exports.getPublisherBooks = getPublisherBooks;
const getRecentPublisherBooks = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let id = parseInt(req.params.id);
    const publisher = yield data_source_1.AppDataSource.getRepository(Publisher_1.Publisher).findOne({
        where: {
            id: (0, typeorm_1.Equal)(id)
        },
        relations: {
            books: true
        },
        order: {
            books: {
                release_date: "desc"
            }
        }
    });
    if (!publisher)
        return res.status(400).send({ message: "Publisher not found" });
    const books = publisher.books;
    res.status(200).send(books);
});
exports.getRecentPublisherBooks = getRecentPublisherBooks;
const createPublishers = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // const publishers = ["Yen Press", "Kodansha", "Kadokawa", "Seven Seas Entertainment",
    //                     "Yen On", "Dark Horse", "J-Novel Club"]
    // publishers.forEach(async (publisher, idx) => {
    //     const publisherObj = new Publisher()
    //     publisherObj.id = idx + 1
    //     publisherObj.name = publisher
    //     const books = await AppDataSource.getRepository(Book).find({
    //         where: {
    //             publisher_id: Equal(idx + 1)
    //         }
    //     })
    //     console.log(books.length)
    //     publisherObj.books = books
    //     await AppDataSource.manager.save(publisherObj)
    // })
    const publishers = yield data_source_1.AppDataSource.getRepository(Publisher_1.Publisher).find({
        relations: {
            books: true
        }
    });
    for (const publisher of publishers) {
        publisher.books.forEach(book => {
            book.publisher = publisher;
            data_source_1.AppDataSource.manager.save(book);
        });
    }
    res.status(200).send({ message: "Complete" });
});
exports.createPublishers = createPublishers;
