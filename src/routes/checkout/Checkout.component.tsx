import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { selectCartItems, selectCartTotalPrice } from '../../store/cart/Cart.selector'

import CheckoutItem from '../../components/checkout-item/CheckoutItem.component'
import PaymentForm from '../../components/payment-form/PaymentForm.component'
import MobileBottomMenu from '../mobile-bottom-menu/MobileBottomMenu.component'

import { CheckoutContainer, CheckOutHeader, HeaderBlock, Total } from './Checkout.styles'
import { CheckoutEmptyMessage, GoBackToShop } from './Checkout.styles'



const Checkout = () => {
    const cartItems = useSelector(selectCartItems)
    const cartTotalPrice = useSelector(selectCartTotalPrice)
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/shop');
    };

    return (
        <>
            { cartItems.length < 1 ? (<CheckoutEmptyMessage>Your cart is empty! <GoBackToShop onClick={handleNavigate}>Continue shopping</GoBackToShop>.</CheckoutEmptyMessage>)
                : (
                    <CheckoutContainer>
                        <CheckOutHeader>
                            <HeaderBlock>
                                <span>Product</span>
                            </HeaderBlock>
                            <HeaderBlock>
                                <span>Quantity</span>
                            </HeaderBlock>
                            <HeaderBlock>
                                <span>Price</span>
                            </HeaderBlock>
                            <HeaderBlock>
                                <span>Total</span>
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
                        <Total>Sub Total: ${cartTotalPrice}</Total>
                        <PaymentForm />
                    </CheckoutContainer>
                )
            }
            <MobileBottomMenu />
        </>
    )
}

export default Checkout