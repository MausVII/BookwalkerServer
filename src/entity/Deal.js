"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deal = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Book_1 = require("./Book");
let Deal = class Deal {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Deal.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Deal.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({
        type: "decimal",
        precision: 5,
        scale: 2
    }),
    tslib_1.__metadata("design:type", Number)
], Deal.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => Book_1.Book, book => book.deal),
    (0, typeorm_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Array)
], Deal.prototype, "books", void 0);
Deal = tslib_1.__decorate([
    (0, typeorm_1.Entity)()
], Deal);
exports.Deal = Deal;
