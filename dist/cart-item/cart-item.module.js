"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemModule = void 0;
const common_1 = require("@nestjs/common");
const cart_item_service_1 = require("./cart-item.service");
const cart_item_controller_1 = require("./cart-item.controller");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("./entities");
const entities_2 = require("../product/entities");
const entities_3 = require("../user/entities");
let CartItemModule = class CartItemModule {
};
CartItemModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([entities_1.CartItem, entities_2.Product, entities_3.User])],
        controllers: [cart_item_controller_1.CartItemController],
        providers: [cart_item_service_1.CartItemService],
    })
], CartItemModule);
exports.CartItemModule = CartItemModule;
//# sourceMappingURL=cart-item.module.js.map