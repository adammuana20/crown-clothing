import { useDispatch, useSelector } from 'react-redux'

import { selectIsCartOpen, selectCartCount } from '../../../store/cart/Cart.selector'
import { setIsCartOpen } from '../../../store/cart/Cart.action'

import { ShoppingIcon, CartIconContainer, ItemCount } from './CartIcon.styles'

const CartIcon = () => {
    // const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)
    const dispatch = useDispatch()
    
    const isCartOpen = useSelector(selectIsCartOpen)
    const cartCount = useSelector(selectCartCount)
    

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon