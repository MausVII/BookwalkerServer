"use strict";
var Book_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Deal_1 = require("./Deal");
const Genre_1 = require("./Genre");
const Publisher_1 = require("./Publisher");
const Series_1 = require("./Series");
let Book = Book_1 = class Book {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Book.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Book.prototype, "title", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Book.prototype, "book_type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Book.prototype, "volume", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        precision: 5,
        scale: 2,
    }),
    tslib_1.__metadata("design:type", Number)
], Book.prototype, "price", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Book.prototype, "page_count", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    tslib_1.__metadata("design:type", Date)
], Book.prototype, "release_date", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Book.prototype, "author", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    tslib_1.__metadata("design:type", String)
], Book.prototype, "artist", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Book.prototype, "short", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)("text"),
    tslib_1.__metadata("design:type", String)
], Book.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Book.prototype, "score", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => Publisher_1.Publisher, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Publisher_1.Publisher)
], Book.prototype, "publisher", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => Series_1.Series, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Series_1.Series)
], Book.prototype, "series", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => Genre_1.Genre, { eager: true }),
    (0, typeorm_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Book.prototype, "genres", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => Deal_1.Deal, deal => deal.books, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Deal_1.Deal)
], Book.prototype, "deal", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => Book_1),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    tslib_1.__metadata("design:type", Object)
], Book.prototype, "dummyField", void 0);
Book = Book_1 = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Book);
exports.Book = Book;
