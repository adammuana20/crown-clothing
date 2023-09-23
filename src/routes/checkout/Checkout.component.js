import { useContext } from 'react'
import { CartContext } from '../../contexts/Cart.context'
import { useSelector } from 'react-redux'

import CheckoutItem from '../../components/checkout-item/CheckoutItem.component'
import { CheckoutContainer, CheckOutHeader, HeaderBlock, Total } from './Checkout.styles.js'
import { selectCartItems, selectCartTotalPrice } from '../../store/cart/Cart.selector'

const Checkout = () => {
    // const { cartItems, cartTotalPrice } = useContext(CartContext)
    const cartItems = useSelector(selectCartItems)
    const cartTotalPrice = useSelector(selectCartTotalPrice)

    return (
        <CheckoutContainer>
            <CheckOutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckOutHeader>
            {
                cartItems.map(( cartItem ) => (
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                ))
            }
            <Total>TOTAL: ${cartTotalPrice}</Total>
        </CheckoutContainer>
    )
}

export default Checkout