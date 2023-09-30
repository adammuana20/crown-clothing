import { useState, FormEvent } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { StripeCardElement } from "@stripe/stripe-js";

import { BUTTON_TYPE_CLASSES } from '../button/Button.component'
import { selectCartTotalPrice } from '../../store/cart/Cart.selector'
import { selectCurrentUser } from '../../store/user/User.selector'

import { PaymentFormContainer, FormContainer, PaymentButton } from "./PaymentForm.styles";

const isValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null

const PaymentForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const amount = useSelector(selectCartTotalPrice)
    const currentUser = useSelector(selectCurrentUser)

    const [isProcessingPayment, setIsProcessingPayment] = useState(false)

    const paymentHandler = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!stripe || !elements) {
            return;
        }
        
        setIsProcessingPayment(true)

        const response = await fetch('/.netlify/functions/CreatePaymentIntent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100 })
        }).then(res => res.json())

        const { paymentIntent: { client_secret }} = response

        const cardDetails = elements.getElement(CardElement)

        if(!isValidCardElement(cardDetails)) return

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: cardDetails,
                billing_details: {
                    name: currentUser?.displayName ? currentUser?.displayName : 'Guest'
                }
            }
        })

        setIsProcessingPayment(false)

        if(paymentResult.error) {
            alert(paymentResult.error.message)
        } else {
            if(paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment Successful')
            }
        }
    }

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted} >Pay Now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm