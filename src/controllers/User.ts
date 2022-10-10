

import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcryptjs from "bcryptjs"
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { Equal } from "typeorm";

export const Register = async (req: Request, res: Response) => {
    const {email, password, gender, join_newsletter, join_coin_program} = req.body

    const user = new User()
    user.email = email
    user.password = await bcryptjs.hash(password, 12)
    user.coins = 1000
    user.gender = gender
    user.join_newsletter = join_newsletter
    user.join_coin_program = join_coin_program
    user.books = []

    await AppDataSource.manager.save(user)

    const {password: _, ...data} = user

    res.status(200).send(data)
}

export const Login = async (req: Request, res: Response) => {
    const {email, password } = req.body
    const user = await AppDataSource.getRepository(User).findOneBy({email: email})

    if(!user)
        return res.status(400).send({ message: "Email not found"})

    if(!await bcryptjs.compare(password, user.password))
        return res.status(400).send({ message: "Incorrect password"})

    const access_token = sign({
        id: user.id
    }, process.env.ACCESS_SECRET!, {expiresIn: '1m'})

    const refresh_token = sign({
        id: user.id
    }, process.env.REFRESH_SECRET!, {expiresIn: '1w'})

    res.cookie('access_token', access_token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    })

    res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.send({ message: "Login successful" })
}

export const getAuthUser = async (req: Request, res: Response) => {
    try {
        if(!process.env.ACCESS_SECRET)
            return res.status(500).send({ message: "Server error"})
        
        const cookie = req.cookies['access_token']
        const payload = verify(cookie, process.env.ACCESS_SECRET!) as JwtPayload
    

        if (!payload) {
            return res.status(401).send({ message: "Unathenticated" })
        }
    
        let id
        try {
            id = parseInt(payload.id!)
        } catch (error) {
            return res.status(400).send({ message: "User not found"})
        }

        const user = await AppDataSource.getRepository(User).findOne({
            where: {
                id: Equal(id)
            }
        })

        if(!user)
            return res.status(400).send({ message: "User not found" })

        const {password, ...data} = user

        res.send(data)
    }
    catch (error) {
        return res.status(401).send({ message: error})
    }
}

export const Refresh = async (req: Request, res: Response) => {
    try {
        if(!process.env.REFRESH_SECRET || !process.env.ACCESS_SECRET)
            return res.status(500).send({ message: "Server error"})

        const cookie = req.cookies['refresh_token']
        const payload = verify(cookie, process.env.REFRESH_SECRET!) as JwtPayload

        if (!payload)
            return res.status(401).send({ message: "Unathenticated" })

        let id
        try {
            id = parseInt(payload.id!)
        } catch (error) {
            return res.status(400).send({ message: "User not found"})
        }

        const access_token = sign({
            id: id,
        }, process.env.ACCESS_SECRET, { expiresIn: '1m'})

        res.cookie('access_token', access_token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.status(200).send({
            message: "Success"
        })
    }
    catch (error) {
        return res.status(401).send({ message: "Unauthenticated"})
    }
}

export const Logout = async (req: Request, res: Response) => {
    res.cookie('access_token', '', { maxAge: 0 })

    res.status(200).send({ 
        message: "Success"
    })
}