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
exports.PhotoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("./entities");
let PhotoService = class PhotoService {
    constructor(photoRepository) {
        this.photoRepository = photoRepository;
    }
    async create(dataBuffer, filename) {
        const newFile = await this.photoRepository.create({
            name: filename,
            data: dataBuffer,
        });
        await this.photoRepository.save(newFile);
        return newFile;
    }
    async findProduct(id) {
        console.log(id);
        const photo = await this.photoRepository.findOne({
            where: {
                product: {
                    id,
                },
            },
        });
        if (!photo) {
            throw new common_1.NotFoundException();
        }
        return photo;
    }
    async findCategory(id) {
        const photo = await this.photoRepository.findOne({
            where: {
                category: {
                    id,
                },
            },
        });
        if (!photo) {
            throw new common_1.NotFoundException();
        }
        return photo;
    }
    async findProductInfo(id, photoNumber) {
        const photo = await this.photoRepository.find({
            where: {
                productInfo: {
                    id,
                },
            },
        });
        if (!photo) {
            throw new common_1.NotFoundException();
        }
        return photo[photoNumber - 1];
    }
    remove(id) {
        return `This action removes a #${id} photo`;
    }
};
PhotoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Photo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PhotoService);
exports.PhotoService = PhotoService;
//# sourceMappingURL=photo.service.js.map