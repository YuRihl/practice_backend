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
exports.Product = void 0;
const swagger_1 = require("@nestjs/swagger");
const entities_1 = require("../../cart-item/entities");
const photo_entity_1 = require("../../photo/entities/photo.entity");
const typeorm_1 = require("typeorm");
const _1 = require("./");
let Product = class Product {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minimum: 0 }),
    (0, typeorm_1.Column)({ type: 'money', scale: 2 }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'How many items of product is sold', minimum: 0 }),
    (0, typeorm_1.Column)({ type: 'int', name: 'sold_count' }),
    __metadata("design:type", Number)
], Product.prototype, "soldCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'General information about product item' }),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when product item instance was created, changes only once product is created',
    }),
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when information about product item was changed, changes every time when information is changed',
    }),
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => _1.Category,
        description: 'Category of product: sport, gaming, food etc',
    }),
    (0, typeorm_1.ManyToOne)(() => _1.Category, (category) => category.products),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", _1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.OneToMany)(() => entities_1.CartItem, (cartItem) => cartItem.product),
    __metadata("design:type", Array)
], Product.prototype, "cartItems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => _1.ProductInfo }),
    (0, typeorm_1.OneToOne)(() => _1.ProductInfo, (productInfo) => productInfo.product),
    (0, typeorm_1.JoinColumn)({ name: 'product_info_id' }),
    __metadata("design:type", _1.ProductInfo)
], Product.prototype, "info", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => photo_entity_1.Photo }),
    (0, typeorm_1.OneToOne)(() => photo_entity_1.Photo, (photo) => photo.product),
    __metadata("design:type", photo_entity_1.Photo)
], Product.prototype, "photo", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)()
], Product);
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map