import { CART_ACTION_TYPES, CartItem } from "./Cart.types";
import { CategoryItem } from "../categories/Category.types";

import { createAction, Action, ActionWithPayload, withMatcher } from "../../utils/reducer/Reducer.utils";


const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem) => {

    //FIND THE CART ITEM TO ADD
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

    // CHECK IF THE CART ITEM EXISTS. IF IT IS ADD 1 TO THE CART ITEM QUANTITY
    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
    }

    // RETURN BACK NEWLY CREATED CART ITEM
    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
    // FIND THE CART ITEM TO REMOVE
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

    // CHECK IF QUANTITY IS EQUAL TO 1. IF IT IS REMOVE THAT ITEM FROM THE CART   
    if(existingCartItem && existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
    }

     // RETURN BACK CARTITEMS WITH MATCHING CART ITEM REDUCED QUANTITY
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id 
        ? { ...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    )
}

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)


export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>
export type SetCartItemsStart = ActionWithPayload<CART_ACTION_TYPES.ADD_ITEMS_TO_CART_START, { product: CategoryItem, qty: number, category: string, showToast: Function } >
export type SetCartItemsSuccess = Action<CART_ACTION_TYPES.ADD_ITEMS_TO_CART_SUCCESS>
export type SetCartItemsFailed = ActionWithPayload<CART_ACTION_TYPES.ADD_ITEMS_TO_CART_FAILED, Error>
export type UpdateQtyItemFromCartStart = ActionWithPayload<CART_ACTION_TYPES.UPDATE_QTY_ITEM_FROM_CART_START, { productID: string, qty: number, setIsUpdating: React.Dispatch<React.SetStateAction<boolean>> } >
export type UpdateQtyItemFromCartSuccess = Action<CART_ACTION_TYPES.UPDATE_QTY_ITEM_FROM_CART_SUCCESS>
export type UpdateQtyItemFromCartFailed = ActionWithPayload<CART_ACTION_TYPES.UPDATE_QTY_ITEM_FROM_CART_FAILED, Error>
export type RemoveItemFromCartStart = ActionWithPayload<CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART_START, { productID: string } >
export type RemoveItemFromCartSuccess = Action<CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART_SUCCESS>
export type RemoveItemFromCartFailed = ActionWithPayload<CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART_FAILED, Error>
export type FetchCartItemsStart = Action<CART_ACTION_TYPES.FETCH_CART_ITEMS_START>
export type FetchCartItemsSuccess = ActionWithPayload<CART_ACTION_TYPES.FETCH_CART_ITEMS_SUCCESS, CartItem[]>
export type FetchCartItemsFailed = Action<CART_ACTION_TYPES.FETCH_CART_ITEMS_FAILED>
export type ClearCartErrorMessage = Action<CART_ACTION_TYPES.CLEAR_CART_ERROR_MESSAGE>

export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen => createAction( CART_ACTION_TYPES.SET_IS_CART_OPEN, bool ))
export const addItemsToCartStart = withMatcher((product: CategoryItem, qty: number, category: string, showToast: Function): SetCartItemsStart => createAction(CART_ACTION_TYPES.ADD_ITEMS_TO_CART_START, { product, qty, category, showToast }))
export const addItemsToCartSuccess = withMatcher((): SetCartItemsSuccess => createAction(CART_ACTION_TYPES.ADD_ITEMS_TO_CART_SUCCESS))
export const addItemsToCartFailed = withMatcher((error: Error): SetCartItemsFailed => createAction(CART_ACTION_TYPES.ADD_ITEMS_TO_CART_FAILED, error))
export const updateQtyItemFromCartStart = withMatcher((productID: string, qty: number, setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>): UpdateQtyItemFromCartStart => createAction(CART_ACTION_TYPES.UPDATE_QTY_ITEM_FROM_CART_START, { productID, qty, setIsUpdating }))
export const updateQtyItemFromCartSuccess = withMatcher((): UpdateQtyItemFromCartSuccess => createAction(CART_ACTION_TYPES.UPDATE_QTY_ITEM_FROM_CART_SUCCESS))
export const updateQtyItemFromCartFailed = withMatcher((error: Error): UpdateQtyItemFromCartFailed => createAction(CART_ACTION_TYPES.UPDATE_QTY_ITEM_FROM_CART_FAILED, error))

export const removeItemFromCartStart = withMatcher((productID: string): RemoveItemFromCartStart => createAction(CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART_START, { productID }))
export const removeItemFromCartSuccess = withMatcher((): RemoveItemFromCartSuccess => createAction(CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART_SUCCESS))
export const removeItemFromCartFailed = withMatcher((error: Error): RemoveItemFromCartFailed => createAction(CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART_FAILED, error))

export const fetchCartItemsStart = withMatcher((): FetchCartItemsStart => createAction(CART_ACTION_TYPES.FETCH_CART_ITEMS_START))
export const fetchCartItemsSuccess = withMatcher((productArray: CartItem[]): FetchCartItemsSuccess => createAction( CART_ACTION_TYPES.FETCH_CART_ITEMS_SUCCESS, productArray ))
export const fetchCartItemsFailed = withMatcher((error: Error): FetchCartItemsFailed => createAction(CART_ACTION_TYPES.FETCH_CART_ITEMS_FAILED, error))
export const clearCartErrorMessage = withMatcher((): ClearCartErrorMessage => createAction(CART_ACTION_TYPES.CLEAR_CART_ERROR_MESSAGE))

// export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
//     const newCartItems = addCartItem(cartItems, productToAdd)
//     return setCartItems(newCartItems)
// }

// export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
//     const newCartItems = removeCartItem(cartItems, cartItemToRemove)
//     return setCartItems(newCartItems)
// }

// export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem) => {
//     const newCartItems = clearCartItem(cartItems, cartItemToClear)
//     return setCartItems(newCartItems)
// }