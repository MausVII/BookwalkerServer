import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";

@Entity()
export class Series {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    num_volumes!: number

    @OneToMany(() => Book, book => book.series)
    books!: Book[]
}