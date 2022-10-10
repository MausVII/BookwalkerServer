"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNovels = exports.getMangas = exports.getOldestVols = exports.getHighestRankedMonthly = exports.getHighestRanked = exports.getRecentNovels = exports.getRecentMangas = exports.getRecentVols = exports.searchBook = exports.getVolsOne = exports.getBooks = exports.getBook = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const data_source_1 = require("../data-source");
const Book_1 = require("../entity/Book");
const getBook = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let id;
    try {
        id = parseInt(req.params.id);
        const book = yield data_source_1.AppDataSource.getRepository(Book_1.Book).findOne({
            where: {
                id: (0, typeorm_1.Equal)(id)
            }
        });
        if (!book)
            return res.status(400).send({ mesasge: "Book not found." });
        res.status(200).send(book);
    }
    catch (error) {
        res.status(400).send({ message: "Book ID is not a number" });
    }
});
exports.getBook = getBook;
const getBooks = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const books = yield data_source_1.AppDataSource.getRepository(Book_1.Book).find();
    res.status(200).send(books);
});
exports.getBooks = getBooks;
const getVolsOne = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const books = yield data_source_1.AppDataSource.getRepository(Book_1.Book).find({
        where: {
            volume: (0, typeorm_1.Equal)(1)
        },
    });
    res.status(200).send(books);
});
exports.getVolsOne = getVolsOne;
const searchBook = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
});
exports.searchBook = searchBook;
const getRecentVols = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const books = yield data_source_1.AppDataSource.getRepository(Book_1.Book).find({
        take: 8,
        order: {
            release_date: "DESC"
        }
    });
    res.status(200).send(books);
});
exports.getRecentVols = getRecentVols;
const getRecentMangas = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const books = yield data_source_1.AppDataSource.getRepository(Book_1.Book).find({
        where: {
            book_type: (0, typeorm_1.Equal)("Manga")
        },
        take: 8,
        order: {
            release_date: "DESC"
        }
    });
    res.status(200).send(books);
});
exports.getRecentMangas = getRecentMangas;
const getRecentNovels = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const books = yield data_source_1.AppDataSource.getRepository(Book_1.Book).find({
        where: {
            book_type: (0, typeorm_1.Equal)("Light Novel")
        },
        take: 8,
        order: {
            release_date: "DESC"
        }
    });
    res.status(200).send(books);
});
exports.getRecentNovels = getRecentNovels;
const getHighestRanked = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const books = yield data_source_1.AppDataSource.getRepository(Book_1.Book).find({
        order: {
            score: "DESC"
        },
    });
    res.status(200).send(books);
});
exports.getHighestRanked = getHighestRanked;
const getHighestRankedMonthly = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const month = new Date(new Date().getFullYear(), new Date().getMonth());
    const books = yield data_source_1.AppDataSource.getRepository(Book_1.Book).find({
        where: {
            release_date: (0, typeorm_1.MoreThan)(month)
        }
    });
    res.status(200).send(books);
});
exports.getHighestRankedMonthly = getHighestRankedMonthly;
const getOldestVols = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const books = yield data_source_1.AppDataSource.getRepository(Book_1.Book).find({
        take: 8,
        order: {
            release_date: "ASC"
        }
    });
    res.status(200).send(books);
});
exports.getOldestVols = getOldestVols;
const getMangas = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const books = yield data_source_1.AppDataSource.getRepository(Book_1.Book).find({
        where: {
            book_type: (0, typeorm_1.Equal)("Manga")
        }
    });
    res.status(200).send(books);
});
exports.getMangas = getMangas;
const getNovels = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const books = yield data_source_1.AppDataSource.getRepository(Book_1.Book).find({
        where: {
            book_type: (0, typeorm_1.Equal)("Light Novel")
        }
    });
    res.status(200).send(books);
});
exports.getNovels = getNovels;
// export const readBooks = async (req: Request, res: Response) => {
//     for (const jBook of jBooks) {
//         const book = new Book()
//         book.id = jBook.id
//         book.title = jBook.title
//         book.book_type = jBook.book_type
//         book.volume = jBook.volume
//         book.price = jBook.price
//         book.page_count = jBook.page_count
//         book.release_date = jBook.release_date
//         book.author = jBook.author
//         book.artist = jBook.artist
//         book.short = jBook.short
//         book.description = jBook.description
//         book.series_id = jBook.series_id
//         book.score = jBook.score
//         await AppDataSource.manager.save(book)
//     }
//     const books = await AppDataSource.getRepository(Book).find()
//     res.status(200).send({
//         books 
//     })
// }
