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
exports.CartItem = void 0;
const swagger_1 = require("@nestjs/swagger");
const entities_1 = require("../../product/entities");
const entities_2 = require("../../user/entities");
const typeorm_1 = require("typeorm");
let CartItem = class CartItem {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], CartItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_2.User, (user) => user.cartItems),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", entities_2.User)
], CartItem.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entities_1.Product, (product) => product.cartItems),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", entities_1.Product)
], CartItem.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minimum: 0, default: 0 }),
    (0, typeorm_1.Column)({ type: 'int', name: 'item_count', default: 0 }),
    __metadata("design:type", Number)
], CartItem.prototype, "itemCount", void 0);
CartItem = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['product'])
], CartItem);
exports.CartItem = CartItem;
//# sourceMappingURL=cart-item.entity.js.map