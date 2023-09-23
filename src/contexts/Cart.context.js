import { createContext, useReducer } from 'react'

import { createAction } from '../utils/reducer/Reducer.utils'

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    removeItem: () => {},
    cartCount: 0,
    cartTotalPrice: 0
})

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
    const { type, payload } = action

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default: {
            throw new Error(`Unhandled type of ${type} in cartReducer`)
        }
    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotalPrice: 0
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
    const { cartItems, cartCount, cartTotalPrice, isCartOpen } = state

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => 
            total + cartItem.quantity
        , 0)

        const newCartTotalPrice = newCartItems.reduce((total, cartItem) => 
            (total + (cartItem.quantity * cartItem.price))
        , 0)

        dispatch(
            createAction( CART_ACTION_TYPES.SET_CART_ITEMS, { 
                cartItems: newCartItems, 
                cartTotalPrice: newCartTotalPrice, 
                cartCount: newCartCount 
            })
        )
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItems)
    }

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove)
        updateCartItemsReducer(newCartItems)
    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear)
        updateCartItemsReducer(newCartItems)
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction( CART_ACTION_TYPES.SET_IS_CART_OPEN, bool ))
    }

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        cartItems, 
        cartCount,  
        removeItemFromCart, 
        clearItemFromCart,
        cartTotalPrice 
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

    // const [isCartOpen, setIsCartOpen] = useState(false)
    // const [cartItems, setCartItems] = useState([])
    // const [cartCount, setCartCount] = useState(0)
    // const [cartTotalPrice, setCartTotalPrice] = useState(0)

    // useEffect(() => {
    //     const newCartCount = cartItems.reduce((total, cartItem) => 
    //         total + cartItem.quantity
    //     , 0)
    //     setCartCount(newCartCount)
    // }, [cartItems])

    // useEffect(() => {
    //     const newCartTotalPrice = cartItems.reduce((total, cartItem) => 
    //         (total + (cartItem.quantity * cartItem.price))
    //     , 0)
    //     setCartTotalPrice(newCartTotalPrice)
    // }, [cartItems])