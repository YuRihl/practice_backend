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
exports.TypeOrmService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const entities_1 = require("../cart-item/entities");
const entities_2 = require("../photo/entities");
const entities_3 = require("../product/entities");
const entities_4 = require("../user/entities");
let TypeOrmService = class TypeOrmService {
    constructor(config) {
        this.config = config;
    }
    createTypeOrmOptions() {
        return {
            type: 'postgres',
            host: this.config.get('DB_HOST'),
            port: this.config.get('DB_PORT'),
            database: this.config.get('DB_NAME'),
            username: this.config.get('DB_USER'),
            password: this.config.get('DB_PASSWORD'),
            entities: [entities_3.Product, entities_3.Category, entities_4.User, entities_1.CartItem, entities_3.ProductInfo, entities_2.Photo],
            migrations: [__dirname + '/migrations/*.{ts,js}'],
            migrationsTableName: 'typeorm_migrations',
            logging: true,
            synchronize: true,
            autoLoadEntities: true,
        };
    }
};
TypeOrmService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(config_1.ConfigService)),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TypeOrmService);
exports.TypeOrmService = TypeOrmService;
//# sourceMappingURL=typeorm.service.js.map