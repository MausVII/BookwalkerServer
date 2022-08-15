"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Series = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Book_1 = require("./Book");
let Series = class Series {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Series.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Series.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Series.prototype, "num_volumes", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => Book_1.Book, book => book.series),
    tslib_1.__metadata("design:type", Array)
], Series.prototype, "books", void 0);
Series = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Series);
exports.Series = Series;
