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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const product_module_1 = require("./product/product.module");
const typeorm_service_1 = require("./typeorm/typeorm.service");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const cart_item_module_1 = require("./cart-item/cart-item.module");
const photo_module_1 = require("./photo/photo.module");
const Joi = require("joi");
let AppModule = class AppModule {
    constructor(configService) {
        this.configService = configService;
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({ useClass: typeorm_service_1.TypeOrmService }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: Joi.object({
                    PORT: Joi.number().default(3000),
                    DB_TYPE: Joi.valid('mysql', 'postgres', 'cockroachdb', 'mariadb', 'sqlite', 'mssql', 'mongodb').default('postgres'),
                    DB_VERSION: Joi.valid(Joi.number(), 'latest').default('latest'),
                    DB_HOST: Joi.string().default('localhost'),
                    DB_PORT: Joi.number().default(5432),
                    DB_NAME: Joi.string(),
                    DB_USER: Joi.string().required(),
                    DB_PASSWORD: Joi.string().required(),
                    PGADMIN_EMAIL: Joi.string().email(),
                    PGADMIN_PASSWORD: Joi.string(),
                    PGADMIN_PORT: Joi.number().default(5050),
                }),
            }),
            product_module_1.ProductModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            cart_item_module_1.CartItemModule,
            photo_module_1.PhotoModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map