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
        // Allow sending/receiving cookies
        credentials: true
    }))
    app.use(cookieParser())

    routes(app)
    app.listen(8000, () => {
        console.log("Listening on port 8000.")
    })
})
.catch( error => {
    console.error(error)
})

