import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Deal } from "./Deal"
import { Genre } from "./Genre"
import { Publisher } from "./Publisher"
import { Series } from "./Series"

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column()
    book_type!: string

    @Column()
    volume!: number

    @Column({
        type: "decimal",
        precision: 5,
        scale: 2,
    })
    price!: number

    @Column()
    page_count!: number

    @Column({ type: 'date'})
    release_date!: Date

    @Column()
    author!: string

    @Column({
        nullable: true
    })
    artist?: string

    @Column()
    short!: string

    @Column("text")
    description!: string

    @Column()
    score!: number

    @ManyToOne(() => Publisher, {eager: true})
    @JoinColumn()
    publisher!: Publisher

    @ManyToOne(() => Series, {eager: true})
    @JoinColumn()
    series!: Series

    @ManyToMany(() => Genre, {eager: true})
    @JoinTable()
    genres!: Genre[]

    @ManyToOne(() => Deal, deal => deal.books, {eager: true})
    @JoinColumn()
    deal!: Deal

    @ManyToOne(() => Book)
    @JoinColumn({ name: 'user_id'})
    dummyField: unknown
}