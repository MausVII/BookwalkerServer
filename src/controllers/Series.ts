import { Request, Response } from "express";
import { Equal } from "typeorm";
import { AppDataSource } from "../data-source";
import { Book } from "../entity/Book";
import { Series } from "../entity/Series";

export const createSeries = async (req: Request, res: Response) => {
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

    const series = await AppDataSource.getRepository(Series).find({
        relations: {
            books: true
        }
    })

    for (const seriesOne of series) {
        seriesOne.num_volumes = seriesOne.books.length
        AppDataSource.manager.save(seriesOne)
    }

    res.status(200).send({ message: "Completed"})
}

export const getSeries = async (req: Request, res: Response) => {
    const series = await AppDataSource.getRepository(Series).find()

    res.status(200).send(series)
}

export const getSeriesBooks = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const series = await AppDataSource.getRepository(Series).findOne({
        where: {
            id: Equal(id)
        },
        relations: {
            books: true
        }
    })
    const books = series?.books

    res.status(200).send(books)
}