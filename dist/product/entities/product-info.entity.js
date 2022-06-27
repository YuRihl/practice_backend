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
exports.ProductInfo = void 0;
const swagger_1 = require("@nestjs/swagger");
const entities_1 = require("../../photo/entities");
const typeorm_1 = require("typeorm");
const _1 = require("./");
let ProductInfo = class ProductInfo {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], ProductInfo.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], ProductInfo.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ProductInfo.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.OneToOne)(() => _1.Product, (product) => product.info),
    __metadata("design:type", _1.Product)
], ProductInfo.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => entities_1.Photo }),
    (0, typeorm_1.OneToMany)(() => entities_1.Photo, (photo) => photo.productInfo),
    __metadata("design:type", Array)
], ProductInfo.prototype, "photos", void 0);
ProductInfo = __decorate([
    (0, typeorm_1.Entity)()
], ProductInfo);
exports.ProductInfo = ProductInfo;
//# sourceMappingURL=product-info.entity.js.map