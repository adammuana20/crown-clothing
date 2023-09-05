import { createContext, useState, useEffect } from 'react'

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)
    if(existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
    }

    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id)

    if(existingCartItem.quantity === 1) {
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
    }
        
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

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotalPrice, setCartTotalPrice] = useState(0)

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear))
    }

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => 
            total + cartItem.quantity
        , 0)
        setCartCount(newCartCount)
    }, [cartItems])

    useEffect(() => {
        const newCartTotalPrice = cartItems.reduce((total, cartItem) => 
            (total + (cartItem.quantity * cartItem.price))
        , 0)
        setCartTotalPrice(newCartTotalPrice)
    }, [cartItems])

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