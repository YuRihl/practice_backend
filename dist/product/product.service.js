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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const photo_entity_1 = require("../photo/entities/photo.entity");
const typeorm_2 = require("typeorm");
const entities_1 = require("./entities");
const entities_2 = require("./entities");
let ProductService = class ProductService {
    constructor(productRepository, productInfoRepository, categoryRepository, photoRepository) {
        this.productRepository = productRepository;
        this.productInfoRepository = productInfoRepository;
        this.categoryRepository = categoryRepository;
        this.photoRepository = photoRepository;
    }
    async findAllProducts(category, name) {
        return await this.productRepository.find({
            select: {
                id: true,
                name: true,
                price: true,
                soldCount: true,
                description: true,
            },
            relations: {
                category: true,
                info: true,
            },
            where: {
                category: {
                    name: category,
                },
                name,
            },
        });
    }
    async findOneProduct(id) {
        return await this.productRepository.findOne({
            select: {
                id: true,
                name: true,
                price: true,
                soldCount: true,
                description: true,
            },
            relations: {
                category: true,
                info: true,
            },
            where: {
                id,
            },
        });
    }
    async findCategories() {
        const categories = await this.categoryRepository.find({
            select: {
                id: true,
                name: true,
            },
        });
        return categories;
    }
    async create(createProductDto) {
        const newProductInfo = await this.createProductInfo(createProductDto.title, createProductDto.text);
        const category = await this.categoryRepository.findOneBy({
            id: createProductDto.categoryId,
        });
        const photo = await this.photoRepository.findOneBy({
            id: createProductDto.photoId,
        });
        const newProduct = await this.productRepository.create({
            name: createProductDto.name,
            price: createProductDto.price,
            soldCount: createProductDto.soldCount,
            description: createProductDto.description,
            info: newProductInfo,
            category,
            photo,
        });
        await this.productRepository.save(newProduct);
        return newProduct;
    }
    async createProductInfo(title, text) {
        const newProductInfo = await this.productInfoRepository.create({
            title,
            text,
        });
        await this.productInfoRepository.save(newProductInfo);
        return newProductInfo;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_2.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(entities_1.ProductInfo)),
    __param(2, (0, typeorm_1.InjectRepository)(entities_1.Category)),
    __param(3, (0, typeorm_1.InjectRepository)(photo_entity_1.Photo)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map