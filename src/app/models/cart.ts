import { CartItem } from "./cartItem";

export interface Cart {
    uid: string;
    items: Array<CartItem>;
}