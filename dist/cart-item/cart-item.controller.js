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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemController = void 0;
const common_1 = require("@nestjs/common");
const decorator_1 = require("../auth/decorator");
const guard_1 = require("../auth/guard");
const entities_1 = require("../user/entities");
const cart_item_service_1 = require("./cart-item.service");
const create_cart_item_dto_1 = require("./dto/create-cart-item.dto");
let CartItemController = class CartItemController {
    constructor(cartItemService) {
        this.cartItemService = cartItemService;
    }
    create(user, createCartItemDto) {
        return this.cartItemService.create(user, createCartItemDto);
    }
    findAll(user) {
        return this.cartItemService.findAll(user);
    }
    findOne(user, id) {
        return this.cartItemService.findOne(user, id);
    }
    remove(user, id) {
        return this.cartItemService.remove(user, id);
    }
};
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Post)(),
    __param(0, (0, decorator_1.UserDecorator)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.User,
        create_cart_item_dto_1.CreateCartItemDto]),
    __metadata("design:returntype", void 0)
], CartItemController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Get)(),
    __param(0, (0, decorator_1.UserDecorator)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.User]),
    __metadata("design:returntype", void 0)
], CartItemController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, decorator_1.UserDecorator)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.User, Number]),
    __metadata("design:returntype", void 0)
], CartItemController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(guard_1.JwtGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, decorator_1.UserDecorator)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.User, Number]),
    __metadata("design:returntype", void 0)
], CartItemController.prototype, "remove", null);
CartItemController = __decorate([
    (0, common_1.Controller)('user/cart'),
    __metadata("design:paramtypes", [cart_item_service_1.CartItemService])
], CartItemController);
exports.CartItemController = CartItemController;
//# sourceMappingURL=cart-item.controller.js.map