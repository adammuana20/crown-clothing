import { CART_ACTION_TYPES } from "./Cart.types";

import { createAction } from "../../utils/reducer/Reducer.utils";


const addCartItem = (cartItems, productToAdd) => {

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

const removeCartItem = (cartItems, cartItemToRemove) => {
    // FIND THE CART ITEM TO REMOVE
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

    // CHECK IF QUANTITY IS EQUAL TO 1. IF IT IS REMOVE THAT ITEM FROM THE CART   
    if(existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
    }

     // RETURN BACK CARTITEMS WITH MATCHING CART ITEM REDUCED QUANTITY
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id 
        ? { ...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    )
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)


export const setIsCartOpen = (bool) => {
    return createAction( CART_ACTION_TYPES.SET_IS_CART_OPEN, bool )
}

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromCart = (cartItems,cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}