import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import CheckoutItem from '../../components/checkout-item/CheckoutItem.component'
import PaymentForm from '../../components/payment-form/PaymentForm.component'
import MobileBottomMenu from '../mobile-bottom-menu/MobileBottomMenu.component'
import PopUp from '../../components/ui/popup/PopUp.component'

import { usePopup } from '../../hooks/usePopup.hooks'
import { selectCartItems, selectCartTotalPrice, selectCartError } from '../../store/cart/Cart.selector'

import { CheckoutContainer, CheckOutHeader, HeaderBlock, Total } from './Checkout.styles'
import { CheckoutEmptyMessage, GoBackToShop } from './Checkout.styles'
import { clearCartErrorMessage } from '../../store/cart/Cart.action'



const Checkout = () => {
    const cartItems = useSelector(selectCartItems)
    const cartTotalPrice = useSelector(selectCartTotalPrice)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { showToast, handleClose, toasts } = usePopup()
    const cartError = useSelector(selectCartError)

    const handleNavigate = () => {
        navigate('/shop');
    };

    useEffect(() => {
        if(cartError) {
            showToast('error', cartError.message)
            dispatch(clearCartErrorMessage())
        }
    }, [cartError])

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
                                <CheckoutItem key={cartItem.id} cartItem={cartItem} showToast={showToast} />
                            ))
                        }
                        <Total>Sub Total: ${cartTotalPrice}</Total>
                        <PaymentForm />
                    </CheckoutContainer>
                )
            }
            <PopUp handleClose={handleClose} toasts={toasts} />
            <MobileBottomMenu />
        </>
    )
}

export default Checkout