import { Request, Response } from "express";
import { Equal } from "typeorm";
import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";
import { Publisher } from "../entity/Publisher";

export const getPublishers = async (req: Request, res: Response) => {
    const publishers = await AppDataSource.getRepository(Publisher).find()

    res.status(200).send(publishers)
}

export const getPublisherData = async (req: Request, res: Response) => {
    let publisher_id = parseInt(req.params.id)

    let publisher = await AppDataSource.getRepository(Publisher).findOne({
        where: {
            id: Equal(publisher_id)
        },
    })
    res.status(200).send(publisher)
}

export const getPublisherBooks = async (req: Request, res: Response) => {
    let id = parseInt(req.params.id)

    const publisher = await AppDataSource.getRepository(Publisher).findOne({
        where: {
            id: Equal(id)
        },
        relations: {
            books: true
        }
    })
    if(!publisher)
        return res.status(400).send({ message: "Publisher not found"})

    const books = publisher.books

    res.status(200).send(books)
}

export const getRecentPublisherBooks = async (req: Request, res: Response) => {
    let id = parseInt(req.params.id)

    const publisher = await AppDataSource.getRepository(Publisher).findOne({
        where: {
            id: Equal(id)
        },
        relations: {
            books: true
        },
        order: {
            books: {
                release_date: "desc"
            }
        }
    })
    if(!publisher)
        return res.status(400).send({ message: "Publisher not found"})

    const books = publisher.books

    res.status(200).send(books)
}

export const createPublishers = async (req: Request, res: Response) => {
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

    const publishers = await AppDataSource.getRepository(Publisher).find({
        relations: {
            books: true
        }
    })

    for (const publisher of publishers) {
        publisher.books.forEach( book => {
            book.publisher = publisher
            AppDataSource.manager.save(book)
        })
    }

    res.status(200).send({message: "Complete"})
}