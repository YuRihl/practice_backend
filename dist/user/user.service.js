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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("./entities");
const bcrypt = require("bcrypt");
const entities_2 = require("../cart-item/entities");
let UserService = class UserService {
    constructor(userRepository, cartRepository) {
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
    }
    findOne(user) {
        return user;
    }
    async update(user, updateUserDto) {
        const hashSalt = await bcrypt.genSalt();
        user = Object.assign(Object.assign(Object.assign({}, user), updateUserDto), { password: await bcrypt.hash(updateUserDto.password, hashSalt) });
        const { email, firstName, secondName } = await this.userRepository.save(user);
        return { email, firstName, secondName };
    }
    async remove(user) {
        const userCart = await this.cartRepository.findBy({
            user: { id: user.id },
        });
        const deletedCart = await this.cartRepository.remove(userCart);
        const { email, firstName, secondName } = await this.userRepository.remove(user);
        return { email, firstName, secondName };
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_2.CartItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map