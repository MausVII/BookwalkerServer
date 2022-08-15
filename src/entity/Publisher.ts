import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";

@Entity()
export class Publisher {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @OneToMany(() => Book, book => book.publisher)
    books!: Book[]
}