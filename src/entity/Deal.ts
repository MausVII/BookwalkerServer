import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";

@Entity()
export class Deal {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    type!: "Discount" | "Coin Back"
    
    @Column({
        type: "decimal",
        precision: 5,
        scale: 2
    })
    amount!: number

    @OneToMany(() => Book, book => book.deal)
    @JoinColumn()
    books!: Book[]
}