import { Photo } from 'src/photo/entities/photo.entity';
import { Product } from '.';
export declare class Category {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    products: Product[];
    photo: Photo;
}
