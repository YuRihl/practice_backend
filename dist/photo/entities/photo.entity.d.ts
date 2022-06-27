import { Category, Product, ProductInfo } from 'src/product/entities';
export declare class Photo {
    id: number;
    name: string;
    data: Uint8Array;
    product?: Product;
    category?: Category;
    productInfo?: ProductInfo;
}
