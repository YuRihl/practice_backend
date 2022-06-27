/// <reference types="node" />
import { Repository } from 'typeorm';
import { Photo } from './entities';
export declare class PhotoService {
    private photoRepository;
    constructor(photoRepository: Repository<Photo>);
    create(dataBuffer: Buffer, filename: string): Promise<Photo>;
    findProduct(id: number): Promise<Photo>;
    findCategory(id: number): Promise<Photo>;
    findProductInfo(id: number, photoNumber: number): Promise<Photo>;
    remove(id: number): string;
}
