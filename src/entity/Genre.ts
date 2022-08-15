import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        unique: true
    })
    name!: string

    @ManyToMany(() => Book)
    @JoinTable()
    books?: Book[]
}