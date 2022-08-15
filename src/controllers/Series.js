"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSeriesBooks = exports.getSeries = exports.createSeries = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const data_source_1 = require("../data-source");
const Series_1 = require("../entity/Series");
const createSeries = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // const books = await AppDataSource.getRepository(Book).find({
    //     where: {
    //         volume: Equal(1)
    //     },
    //     order: {
    //         id: "ASC"
    //     }
    // })
    // for (const book of books) {
    //     const series = new Series()
    //     series.id = book.id
    //     series.name = book.title
    //     series.books = await AppDataSource.getRepository(Book).find({
    //         where: {
    //             series_id: Equal(book.series_id)
    //         }
    //     })
    //     AppDataSource.manager.save(series)
    // }
    const series = yield data_source_1.AppDataSource.getRepository(Series_1.Series).find({
        relations: {
            books: true
        }
    });
    for (const seriesOne of series) {
        seriesOne.num_volumes = seriesOne.books.length;
        data_source_1.AppDataSource.manager.save(seriesOne);
    }
    res.status(200).send({ message: "Completed" });
});
exports.createSeries = createSeries;
const getSeries = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const series = yield data_source_1.AppDataSource.getRepository(Series_1.Series).find();
    res.status(200).send(series);
});
exports.getSeries = getSeries;
const getSeriesBooks = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const series = yield data_source_1.AppDataSource.getRepository(Series_1.Series).findOne({
        where: {
            id: (0, typeorm_1.Equal)(id)
        },
        relations: {
            books: true
        }
    });
    const books = series === null || series === void 0 ? void 0 : series.books;
    res.status(200).send(books);
});
exports.getSeriesBooks = getSeriesBooks;
