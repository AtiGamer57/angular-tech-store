import { Product } from "./product";

export interface CartItemWithProduct {
    itemid: string;
    count: number;
    product?: Product;
}