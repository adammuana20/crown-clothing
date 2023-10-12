import { useCallback } from 'react'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Button from '../button/Button.component'
import CartItem from '../cart-item/CartItem.component'
import { selectCartItems } from '../../store/cart/Cart.selector'

import { CartDropdownContainer, CartDropdownEmptyMessage, CartItems } from './CartDropdown.styles'

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems)
    const navigate = useNavigate()

    const goToCheckoutHandler = useCallback(() => {
        navigate('checkout') 
    }, [])

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                    )))
                    : (
                        <CartDropdownEmptyMessage>Your Cart Is Empty!</CartDropdownEmptyMessage>
                    )
                }
            </CartItems>
            { cartItems.length > 0 &&
                <Button onClick={goToCheckoutHandler}>Go to Checkout</Button>
            }
        </CartDropdownContainer>
    )
}

export default CartDropdown