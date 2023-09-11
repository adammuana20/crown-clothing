import { useContext } from 'react'
import { CartContext } from '../../contexts/Cart.context'

import { CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton } from './CheckoutItem.styles'

const CheckoutItem = ({ cartItem }) => {
    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext)
    const { name, imageUrl, quantity, price } = cartItem
    
    const addQtyHandler = () => addItemToCart(cartItem)
    const decQtyHandler = () => removeItemFromCart(cartItem)
    const clearItemHandler = () => clearItemFromCart(cartItem)

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name} />
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={decQtyHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addQtyHandler}>&#10095;</Arrow>
            </Quantity>
            <BaseSpan>{price}</BaseSpan>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem