import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "../entity/Book";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        unique: true
    })
    email!: string

    @Column()
    password!: string

    @Column()
    coins!: number

    @Column()
    gender!: string

    @Column()
    join_newsletter!: boolean

    @Column()
    join_coin_program!: boolean

    @OneToMany(() => Book, book => book.dummyField, {eager: true})
    books!: Book[]
}