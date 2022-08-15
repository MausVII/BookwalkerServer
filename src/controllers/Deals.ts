import { Request, Response } from "express";
import { Equal, In, LessThan, MoreThan } from "typeorm";
import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";
import { Deal } from "../entity/Deal";

export const getDeals = async (req: Request, res: Response) => {
    const deals = await AppDataSource.getRepository(Deal).find({
        relations: {
            books: true
        }
    })

    res.status(200).send(deals)
}

export const getFreeBooks = async (req: Request, res: Response) => {
    const deal = await AppDataSource.getRepository(Deal).findOne({
        where: {
            type: Equal("Discount"),
            amount: Equal(1)
        },
        relations: {
            books: true
        }
    })

    const books = deal?.books
 
    res.status(200).send(books)
}

export const getCoinBackBooks = async (req: Request, res: Response) => {
    const deal = await AppDataSource.getRepository(Deal).findOne({
        where: {
            type: Equal("Coin Back"),
        },
        relations: {
            books: true
        }
    })

    const books = deal?.books

    res.status(200).send(books)
}

export const getDiscountedBooks = async (req: Request, res: Response) => {
    const deal = await AppDataSource.getRepository(Deal).findOne({
        where: {
            type: Equal("Discount"),
            amount: LessThan(1.0)
        },
        relations: {
            books: true
        }
    })

    const books = deal?.books

    res.status(200).send(books)
}

export const createDeals = async (req: Request, res: Response) => {

    const book = await AppDataSource.getRepository(Book).findOne({
        where: {
            id: Equal(17)
        }
    })

    const deal = await AppDataSource.getRepository(Deal).findOne({
        where: {
            id: Equal(1)  
        }
    })

    deal!.books = [book!]
    await AppDataSource.manager.save(deal)

    book!.deal = deal! 
    await AppDataSource.manager.save(book)

    // books.forEach( async book => {
    //     book.deal = deal!
    //     await AppDataSource.manager.save(book)
    // })

    res.status(200).send({ message: "Success"})
}