import { Console } from "console";
import { Request, Response } from "express";
import { Equal, In } from "typeorm";
import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";
import { Genre } from "../entity/Genre";



export const getGenres = async (req: Request, res: Response) => {
    const genres = await AppDataSource.getRepository(Genre).find()

    res.status(200).send(genres)
}

export const getGenreData = async (req: Request, res: Response) => {
    let genre_id = parseInt(req.params.id)

    let genre = await AppDataSource.getRepository(Genre).findOne({
        where: {
            id: Equal(genre_id)
        },
    })
    res.status(200).send(genre)
}

export const getGenreBooks = async (req: Request, res: Response) => {
    let genre_id = parseInt(req.params.id)

    let books = await AppDataSource.getRepository(Genre).findOne({
        where: {
            id: Equal(genre_id)
        },
        relations: {
            books: true
        }
    })

    res.status(200).send(books!.books)
}

export const getRecentGenreBooks = async (req: Request, res: Response) => {
    let genre_id = parseInt(req.params.id)

    let books = await AppDataSource.getRepository(Book).find({
        where: {
            genres: {
                id: Equal(genre_id)
            }
        },
        relations: {
            genres: true
        },
        take: 8,
        order: {
            release_date: "DESC"
        }
        
    })

    res.status(200).send(books)
}

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