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
exports.User = void 0;
const swagger_1 = require("@nestjs/swagger");
const entities_1 = require("../../cart-item/entities");
const typeorm_1 = require("typeorm");
let User = class User {
};
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Id is generated automatically, dont send it!' }),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        minimum: 5,
        maximum: 50,
    }),
    (0, typeorm_1.Column)({ unique: true, length: 50 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minimum: 6, maximum: 100 }),
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minimum: 1, maximum: 50 }),
    (0, typeorm_1.Column)({ name: 'first_name', length: 50 }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ minimum: 1, maximum: 50 }),
    (0, typeorm_1.Column)({ name: 'second_name', length: 50 }),
    __metadata("design:type", String)
], User.prototype, "secondName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when user profile was created, changes only once user is created',
    }),
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when information about user was changed, changes every time when information is changed',
    }),
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, typeorm_1.OneToMany)(() => entities_1.CartItem, (cartItem) => cartItem.user),
    __metadata("design:type", Array)
], User.prototype, "cartItems", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map