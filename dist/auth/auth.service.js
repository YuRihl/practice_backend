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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../user/entities");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(configService, jwtService, userRepository) {
        this.configService = configService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }
    async login(userDto) {
        const user = await this.userRepository.findOneBy({
            email: userDto.email,
        });
        if (!user)
            return new common_1.NotFoundException('The are not user with this email');
        const passwordCheck = await bcrypt.compare(userDto.password, user.password);
        if (!passwordCheck) {
            return new common_1.UnauthorizedException('Incorrect password');
        }
        return this.signToken(user.email, user.id);
    }
    async register(userDto) {
        try {
            const hashSalt = await bcrypt.genSalt();
            const userToCreate = this.userRepository.create({
                email: userDto.email,
                password: await bcrypt.hash(userDto.password, hashSalt),
                firstName: userDto.firstName,
                secondName: userDto.secondName,
            });
            await this.userRepository.save(userToCreate);
            const createdUser = await this.userRepository.findOneBy({
                email: userDto.email,
            });
            return this.signToken(createdUser.email, createdUser.id);
        }
        catch (error) {
            return new common_1.BadRequestException(error);
        }
    }
    async signToken(email, id) {
        const payload = { email, sub: id };
        return {
            access_token: await this.jwtService.signAsync(payload, {
                expiresIn: '500m',
                secret: this.configService.get('JWT_SECRET_KEY'),
            }),
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.User)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        jwt_1.JwtService,
        typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map