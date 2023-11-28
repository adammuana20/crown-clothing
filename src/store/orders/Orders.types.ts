import { CartItem } from "../cart/Cart.types";

export enum ORDER_ACTION_TYPES {
    CREATE_ORDER_START = 'order/CREATE_ORDER_START',
    CREATE_ORDER_SUCCESS = 'order/CREATE_ORDER_SUCCESS',
    CREATE_ORDER_FAILED = 'order/CREATE_ORDER_FAILED',
}

export type Order = {
    orderID: string;
    total: number;
    items: CartItem[];
    paymentMethod: string;
}