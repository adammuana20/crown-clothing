import { Timestamp } from "firebase/firestore";
import { CartItem } from "../cart/Cart.types";

export enum ORDER_ACTION_TYPES {
    CREATE_ORDER_START = 'order/CREATE_ORDER_START',
    CREATE_ORDER_SUCCESS = 'order/CREATE_ORDER_SUCCESS',
    CREATE_ORDER_FAILED = 'order/CREATE_ORDER_FAILED',
    FETCH_ORDERS_START = 'order/FETCH_ORDERS_START',
    FETCH_ORDERS_SUCCESS = 'order/FETCH_ORDERS_SUCCESS',
    FETCH_ORDERS_FAILED = 'order/FETCH_ORDERS_FAILED',
}

export type Order = {
    id: string;
    createdAt: Timestamp;
    total: number;
    items: CartItem[];
    paymentMethod: string;
}