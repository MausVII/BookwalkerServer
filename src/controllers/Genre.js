"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentGenreBooks = exports.getGenreBooks = exports.getGenreData = exports.getGenres = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const data_source_1 = require("../data-source");
const Book_1 = require("../entity/Book");
const Genre_1 = require("../entity/Genre");
const getGenres = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const genres = yield data_source_1.AppDataSource.getRepository(Genre_1.Genre).find();
    res.status(200).send(genres);
});
exports.getGenres = getGenres;
const getGenreData = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let genre_id = parseInt(req.params.id);
    let genre = yield data_source_1.AppDataSource.getRepository(Genre_1.Genre).findOne({
        where: {
            id: (0, typeorm_1.Equal)(genre_id)
        },
    });
    res.status(200).send(genre);
});
exports.getGenreData = getGenreData;
const getGenreBooks = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let genre_id = parseInt(req.params.id);
    let books = yield data_source_1.AppDataSource.getRepository(Genre_1.Genre).findOne({
        where: {
            id: (0, typeorm_1.Equal)(genre_id)
        },
        relations: {
            books: true
        }
    });
    res.status(200).send(books.books);
});
exports.getGenreBooks = getGenreBooks;
const getRecentGenreBooks = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let genre_id = parseInt(req.params.id);
    let books = yield data_source_1.AppDataSource.getRepository(Book_1.Book).find({
        where: {
            genres: {
                id: (0, typeorm_1.Equal)(genre_id)
            }
        },
        relations: {
            genres: true
        },
        take: 8,
        order: {
            release_date: "DESC"
        }
    });
    res.status(200).send(books);
});
exports.getRecentGenreBooks = getRecentGenreBooks;
//export const createGenres = async (req: Request, res: Response) => {
//     const genres = ["Fantasy", "Slice of Life", "Isekai", "Comedy", "Action", "Drama", "Adventure",
//                     "Seinen", "Sci-fi", "Tragedy", "Shounen", "School Life", "Ecchi", "Romance", "Horror"]
//     genres.forEach(async (genre, idx) => {
//         let genreObj = new Genre()
//         genreObj.name = genre
//         let book_ids = genre_bindings.filter(binding => binding.genre_id == idx + 1).map( genre => genre.book_id)
//         const books = await AppDataSource.getRepository(Book).find({
//             where: {
//                 id: In(book_ids)
//             }
//         })
//         genreObj.books = books
//         await AppDataSource.manager.save(genreObj)
//     })
//     let response = AppDataSource.getRepository(Genre).find()
//     res.status(200).send(response)
// }
// export const updateGenres = async (req: Request, res: Response) => {
//     const genres = await AppDataSource.getRepository(Genre).find({
//         relations: {
//             books: true
//         }
//     })
//     for (const genre of genres) {
//         const bookIds = genre.books!.map( book => book.id)
//         const books = await AppDataSource.getRepository(Book).find({
//             relations: {
//                 genres: true
//             },
//             where: {
//                 id: In(bookIds)
//             }
//         })
//         for (const book of books) {
//             book.genres = [...book.genres, genre]
//             await AppDataSource.manager.save(book)
//         }
//         console.log(`Genre: ${genre.name} finished.`)
//     }
//     res.status(200).send({ message: "Complete"})
// }
