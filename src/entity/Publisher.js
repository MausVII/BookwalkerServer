"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publisher = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Book_1 = require("./Book");
let Publisher = class Publisher {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Publisher.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Publisher.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => Book_1.Book, book => book.publisher),
    tslib_1.__metadata("design:type", Array)
], Publisher.prototype, "books", void 0);
Publisher = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Publisher);
exports.Publisher = Publisher;
