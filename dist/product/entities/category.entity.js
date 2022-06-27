"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const swagger_1 = require("@nestjs/swagger");
const photo_entity_1 = require("../../photo/entities/photo.entity");
const typeorm_1 = require("typeorm");
const _1 = require(".");
let Category = class Category {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when category instance was created, changes only once category is created',
    }),
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Category.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when information about category was changed, changes every time when information is changed',
    }),
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Category.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => _1.Product }),
    (0, typeorm_1.OneToMany)(() => _1.Product, (product) => product.category),
    __metadata("design:type", Array)
], Category.prototype, "products", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => photo_entity_1.Photo }),
    (0, typeorm_1.OneToOne)(() => photo_entity_1.Photo, (photo) => photo.category),
    __metadata("design:type", photo_entity_1.Photo)
], Category.prototype, "photo", void 0);
Category = __decorate([
    (0, typeorm_1.Entity)()
], Category);
exports.Category = Category;
//# sourceMappingURL=category.entity.js.map