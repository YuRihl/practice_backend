import { Photo } from 'src/photo/entities';
import { Product } from './';
export declare class ProductInfo {
    id: number;
    title: string;
    text: string;
    product: Product;
    photos: Photo[];
}
