import { CartItem } from 'src/cart-item/entities';
export declare class User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    secondName: string;
    createdAt: Date;
    updatedAt: Date;
    cartItems: CartItem[];
}
