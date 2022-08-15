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

    @OneToMany(() => Book, book => book.dummyField, {eager: true})
    books!: Book[]
}