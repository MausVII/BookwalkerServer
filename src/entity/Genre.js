"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Genre = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Book_1 = require("./Book");
let Genre = class Genre {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Genre.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        unique: true
    }),
    tslib_1.__metadata("design:type", String)
], Genre.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => Book_1.Book),
    (0, typeorm_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Genre.prototype, "books", void 0);
Genre = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Genre);
exports.Genre = Genre;
