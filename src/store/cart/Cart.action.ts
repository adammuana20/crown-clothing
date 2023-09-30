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

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>



export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen => createAction( CART_ACTION_TYPES.SET_IS_CART_OPEN, bool ))

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems))

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return setCartItems(newCartItems)
}

export const removeItemFromCart = (cartItems: CartItem[], cartItemToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove)
    return setCartItems(newCartItems)
}

export const clearItemFromCart = (cartItems: CartItem[], cartItemToClear: CartItem) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear)
    return setCartItems(newCartItems)
}