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
exports.PhotoController = void 0;
const common_1 = require("@nestjs/common");
const photo_service_1 = require("./photo.service");
const platform_express_1 = require("@nestjs/platform-express");
const PlatformTools_1 = require("typeorm/platform/PlatformTools");
let PhotoController = class PhotoController {
    constructor(photoService) {
        this.photoService = photoService;
    }
    create(file) {
        return this.photoService.create(file.buffer, file.originalname);
    }
    async findProduct(id, response) {
        const photo = await this.photoService.findProduct(id);
        const stream = PlatformTools_1.Readable.from(photo.data);
        response.set({
            'Content-Disposition': `inline; filename="${photo.name}"`,
            'Content-Type': 'image',
        });
        return new common_1.StreamableFile(stream);
    }
    async findCategory(id, response) {
        const photo = await this.photoService.findCategory(id);
        const stream = PlatformTools_1.Readable.from(photo.data);
        response.set({
            'Content-Disposition': `inline; filename="${photo.name}"`,
            'Content-Type': 'image',
        });
        return new common_1.StreamableFile(stream);
    }
    async findProductInfo(id, photoNumber, response) {
        const photo = await this.photoService.findProductInfo(id, photoNumber);
        const stream = PlatformTools_1.Readable.from(photo.data);
        response.set({
            'Content-Disposition': `inline; filename="${photo.name}"`,
            'Content-Type': 'image',
        });
        return new common_1.StreamableFile(stream);
    }
    remove(id) {
        return this.photoService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PhotoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('product/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "findProduct", null);
__decorate([
    (0, common_1.Get)('category/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "findCategory", null);
__decorate([
    (0, common_1.Get)('productInfo/:id/:photoNumber'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('photoNumber', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], PhotoController.prototype, "findProductInfo", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PhotoController.prototype, "remove", null);
PhotoController = __decorate([
    (0, common_1.Controller)('photos'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [photo_service_1.PhotoService])
], PhotoController);
exports.PhotoController = PhotoController;
//# sourceMappingURL=photo.controller.js.map