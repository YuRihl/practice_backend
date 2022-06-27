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
exports.CartItemService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../product/entities");
const entities_2 = require("../user/entities");
const typeorm_2 = require("typeorm");
const entities_3 = require("./entities");
let CartItemService = class CartItemService {
    constructor(cartItemRepository, productRepository, userRepository) {
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }
    async create(user, createCartItemDto) {
        const product = await this.productRepository.findOneBy({
            id: createCartItemDto.productId,
        });
        const upsertResult = await this.cartItemRepository.upsert({
            user,
            product,
        }, { conflictPaths: ['product'] });
        await this.cartItemRepository.increment({ id: upsertResult.identifiers[0].id }, 'itemCount', createCartItemDto.itemCount);
        return await this.checkItemCount(upsertResult.identifiers[0].id);
    }
    async findAll(user) {
        const cartItems = await this.getCartItems({ user: { id: user.id } });
        if (!cartItems)
            return new common_1.NotFoundException();
        return cartItems;
    }
    async findOne(user, id) {
        const cartItem = await this.getCartItem({ user: { id: user.id }, id });
        if (!cartItem)
            return new common_1.NotFoundException();
        return cartItem;
    }
    async remove(user, id) {
        const cartItem = await this.getCartItem({ user: { id: user.id }, id });
        const deletedCartItem = await this.cartItemRepository.remove(cartItem);
        return deletedCartItem;
    }
    async checkItemCount(id) {
        const cartItem = await this.getCartItem({ id });
        if (cartItem.itemCount <= 0) {
            this.cartItemRepository.update({ id: cartItem.id }, { itemCount: 0 });
        }
        return this.getCartItem({ id: cartItem.id });
    }
    async getCartItem(options) {
        const returnedCartItem = await this.cartItemRepository.findOne({
            select: {
                product: {
                    name: true,
                    price: true,
                },
                itemCount: true,
                id: true,
            },
            relations: {
                product: true,
            },
            where: options,
        });
        return returnedCartItem;
    }
    async getCartItems(options) {
        const returnedCartItem = await this.cartItemRepository.find({
            select: {
                product: {
                    name: true,
                    price: true,
                },
                itemCount: true,
                id: true,
            },
            relations: {
                product: true,
            },
            where: options,
        });
        return returnedCartItem;
    }
};
CartItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_3.CartItem)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.Product)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_2.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CartItemService);
exports.CartItemService = CartItemService;
//# sourceMappingURL=cart-item.service.js.map