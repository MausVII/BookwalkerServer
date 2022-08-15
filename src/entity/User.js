"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Book_1 = require("../entity/Book");
let User = class User {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        unique: true
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "coins", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => Book_1.Book, book => book.dummyField, { eager: true }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "books", void 0);
User = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
