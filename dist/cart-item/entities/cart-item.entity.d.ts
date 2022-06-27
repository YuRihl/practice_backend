import { Product } from 'src/product/entities';
import { User } from 'src/user/entities';
export declare class CartItem {
    id: number;
    user: User;
    product: Product;
    itemCount: number;
}
