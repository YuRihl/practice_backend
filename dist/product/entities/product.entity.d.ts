import { CartItem } from 'src/cart-item/entities';
import { Photo } from 'src/photo/entities/photo.entity';
import { Category, ProductInfo } from './';
export declare class Product {
    id: number;
    name: string;
    price: number;
    soldCount: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
    cartItems: CartItem[];
    info: ProductInfo;
    photo: Photo;
}
