import { useSelector } from 'react-redux'

import { selectCartItems, selectCartTotalPrice } from '../../store/cart/Cart.selector'

import CheckoutItem from '../../components/checkout-item/CheckoutItem.component'
import PaymentForm from '../../components/payment-form/PaymentForm.component'
import { CheckoutContainer, CheckOutHeader, HeaderBlock, Total } from './Checkout.styles'
import { CheckoutEmptyMessage } from './Checkout.styles'


const Checkout = () => {
    const cartItems = useSelector(selectCartItems)
    const cartTotalPrice = useSelector(selectCartTotalPrice)
    console.log(cartItems);
    return (
        <>
            { cartItems.length < 1 ? (<CheckoutEmptyMessage>Your Cart Is Empty!</CheckoutEmptyMessage>)
                : (
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
                        <PaymentForm />
                    </CheckoutContainer>
                )
            }
        </>
    )
}

export default Checkout