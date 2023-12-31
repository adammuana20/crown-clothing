import { AnyAction } from "redux"

import { CartItem } from "./Cart.types";
import { 
    setIsCartOpen, 
    fetchCartItemsStart, 
    fetchCartItemsSuccess, 
    addItemsToCartStart, 
    addItemsToCartSuccess, 
    addItemsToCartFailed, 
    updateQtyItemFromCartStart, 
    updateQtyItemFromCartSuccess, 
    updateQtyItemFromCartFailed, 
    clearCartErrorMessage,
    removeItemFromCartFailed
} from "./Cart.action";

export type CartState = {
    readonly isCartOpen: boolean;
    readonly cartItems: CartItem[];
    readonly cartItemsIsLoading: boolean;
    readonly addingItemToCart: boolean;
    readonly updatingQtyFromCart: boolean;
    readonly error: Error | null;
}

export const CART_INITIAL_STATE: CartState = {
    isCartOpen: false,
    cartItems: [],
    cartItemsIsLoading: false,
    addingItemToCart: false,
    updatingQtyFromCart: false,
    error: null,
}

export const cartReducer = (state = CART_INITIAL_STATE, action: AnyAction): CartState => {
    if(setIsCartOpen.match(action)) {
        return {
            ...state,
            isCartOpen: action.payload
        }
    }

    if(fetchCartItemsStart.match(action)) {
        return {
            ...state,
            cartItemsIsLoading: true,
        }
    }

    if(fetchCartItemsSuccess.match(action)) {
        return {
            ...state,
            cartItems: action.payload,
            cartItemsIsLoading: false,
        }
    }

    if(addItemsToCartStart.match(action)) {
        return {
            ...state,
            addingItemToCart: true,
        }
    }

    if(addItemsToCartSuccess.match(action)) {
        return {
            ...state,
            addingItemToCart: false,
        }
    }

    if(addItemsToCartFailed.match(action)) {
        return {
            ...state,
            addingItemToCart: false,
            error: action.payload,
        }
    }

    if(updateQtyItemFromCartStart.match(action)) {
        return {
            ...state,
            updatingQtyFromCart: true,
        }
    }

    if(updateQtyItemFromCartSuccess.match(action)) {
        return {
            ...state,
            updatingQtyFromCart: false,
        }
    }

    if(updateQtyItemFromCartFailed.match(action)) {
        return {
            ...state,
            updatingQtyFromCart: false,
            error: action.payload,
        }
    }

    if(removeItemFromCartFailed.match(action)) {
        return {
            ...state,
            error: action.payload,
        }
    }

    if(clearCartErrorMessage.match(action)) {
        return {
            ...state,
            error: null,
        }
    }

    return state
}