import { CategoryItem } from "../categories/Category.types";

export enum CART_ACTION_TYPES {
    ADD_ITEMS_TO_CART_START = 'cart/ADD_ITEMS_TO_CART_START',
    ADD_ITEMS_TO_CART_SUCCESS = 'cart/ADD_ITEMS_TO_CART_SUCCESS',
    ADD_ITEMS_TO_CART_FAILED = 'cart/ADD_ITEMS_TO_CART_FAILED',
    FETCH_CART_ITEMS_START = 'cart/FETCH_CART_ITEMS_START',
    FETCH_CART_ITEMS_SUCCESS = 'cart/FETCH_CART_ITEMS_SUCCESS',
    FETCH_CART_ITEMS_FAILED = 'cart/FETCH_CART_ITEMS_FAILED',
    UPDATE_QTY_ITEM_FROM_CART_START = 'cart/UPDATE_QTY_ITEM_FROM_CART_START',
    UPDATE_QTY_ITEM_FROM_CART_SUCCESS = 'cart/UPDATE_QTY_ITEM_FROM_CART_SUCCESS',
    UPDATE_QTY_ITEM_FROM_CART_FAILED = 'cart/UPDATE_QTY_ITEM_FROM_CART_FAILED',
    REMOVE_ITEM_FROM_CART_START = 'cart/REMOVE_ITEM_FROM_CART_START',
    REMOVE_ITEM_FROM_CART_SUCCESS = 'cart/REMOVE_ITEM_FROM_CART_SUCCESS',
    REMOVE_ITEM_FROM_CART_FAILED = 'cart/REMOVE_ITEM_FROM_CART_FAILED',
    SET_IS_CART_OPEN = 'cart/SET_IS_CART_OPEN',
    SET_CART_COUNT = 'cart/SET_CART_COUNT',
    SET_CART_TOTAL = 'cart/SET_CART_TOTAL',
    CLEAR_CART_ERROR_MESSAGE = 'cart/CLEAR_CART_ERROR_MESSAGE'
}

export type CartItem = CategoryItem & {
    quantity: number;
    category: string;
}