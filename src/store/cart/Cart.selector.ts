import { createSelector } from "reselect"

import { RootState } from "../Store"

import { CartState } from "./Cart.reducer"

const selectCartReducer = (state: RootState): CartState => state.cart

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
)

export const selectIsCartOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isCartOpen
)

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, cartItem) => 
    total + cartItem.quantity
    , 0)
)

export const selectCartTotalPrice = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, cartItem) => 
    (total + (cartItem.quantity * cartItem.price))
, 0)
)