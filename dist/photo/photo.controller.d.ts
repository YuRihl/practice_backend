/// <reference types="multer" />
import { StreamableFile } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Response } from 'express';
export declare class PhotoController {
    private readonly photoService;
    constructor(photoService: PhotoService);
    create(file: Express.Multer.File): Promise<import("./entities").Photo>;
    findProduct(id: number, response: Response): Promise<StreamableFile>;
    findCategory(id: number, response: Response): Promise<StreamableFile>;
    findProductInfo(id: number, photoNumber: number, response: Response): Promise<StreamableFile>;
    remove(id: string): string;
}
