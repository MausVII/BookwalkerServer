require('dotenv').config()

import express, { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { routes } from "./routes"
import cors from "cors"
import cookieParser from "cookie-parser"
AppDataSource.initialize()
.then(() => {
    console.log("Data source has been initialized.")
    const app = express()

    app.use(express.json())
    app.use(cors({
        origin: ["http://localhost:3000", "https://master.d1im558cdd1ym1.amplifyapp.com/"],
        // Allow sending/receiving cookies
        credentials: true
    }))
    app.use(cookieParser())

    routes(app)
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}.`)
    })
})
.catch( error => {
    console.error(error)
})

