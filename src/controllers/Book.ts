import { Request, Response } from "express";
import { Equal, LessThan, MoreThan } from "typeorm";
import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";

export const getBook = async(req: Request, res: Response) => {
    let id: number

    try {
        id = parseInt(req.params.id)

        const book = await AppDataSource.getRepository(Book).findOne({
            where: {
                id: Equal(id)
            }
        })
    
        if(!book)
            return res.status(400).send({mesasge: "Book not found."})

        res.status(200).send(book)
    }
    catch( error ) {
        res.status(400).send({message: "Book ID is not a number"})
    }

}

export const getBooks = async (req: Request, res: Response) => {
    console.log("Here")
    const books = await AppDataSource.getRepository(Book).find()

    res.status(200).send(books)
}

export const getVolsOne = async (req: Request, res: Response) => {
    console.log("Here")
    const books = await AppDataSource.getRepository(Book).find({
        where: {
            volume: Equal(1)
        },
    })

    res.status(200).send(books)
}

export const searchBook = async (req: Request, res: Response) => {
    
}

export const getRecentVols = async (req: Request, res: Response) => {
    const books = await AppDataSource.getRepository(Book).find({
        take: 8,
        order: {
            release_date: "DESC"
        }
    })

    res.status(200).send(books)
}

export const getRecentMangas = async (req: Request, res: Response) => {
    const books = await AppDataSource.getRepository(Book).find({
        where: {
            book_type: Equal("Manga")
        },
        take: 8,
        order: {
            release_date: "DESC"
        }
    })

    res.status(200).send(books)
}

export const getRecentNovels = async (req: Request, res: Response) => {
    const books = await AppDataSource.getRepository(Book).find({
        where: {
            book_type: Equal("Light Novel")
        },
        take: 8,
        order: {
            release_date: "DESC"
        }
    })

    res.status(200).send(books)
}

export const getHighestRanked = async (req: Request, res: Response) => {
    const books = await AppDataSource.getRepository(Book).find({
        order: {
            score: "DESC"
        },
    })

    res.status(200).send(books)
}

export const getHighestRankedMonthly = async (req: Request, res:Response) => {
    const month = new Date(new Date().getFullYear(), new Date().getMonth())
    console.log(month)
    const books = await AppDataSource.getRepository(Book).find({
        where: {
            release_date: MoreThan(month)
        }
    })

    res.status(200).send(books)
}

export const getOldestVols = async (req: Request, res: Response) => {
    const books = await AppDataSource.getRepository(Book).find({
        take: 8,
        order: {
            release_date: "ASC"
        }
    })

    res.status(200).send(books)
}

export const getMangas = async (req: Request, res: Response) => {
    const books = await AppDataSource.getRepository(Book).find({
        where: {
            book_type: Equal("Manga")
        }
    })

    res.status(200).send(books)
}

export const getNovels = async (req: Request, res: Response) => {
    const books = await AppDataSource.getRepository(Book).find({
        where: {
            book_type: Equal("Light Novel")
        }
    })

    res.status(200).send(books)
}

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