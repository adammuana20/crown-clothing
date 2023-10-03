import { useSelector, useDispatch } from 'react-redux'
import { FC } from 'react'

import { CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton } from './CheckoutItem.styles'
import { addItemToCart, removeItemFromCart, clearItemFromCart } from '../../store/cart/Cart.action'
import { selectCartItems } from '../../store/cart/Cart.selector'
import { CartItem as TCartItem } from '../../store/cart/Cart.types'

type CheckoutItemProps = {
    cartItem: TCartItem;
}

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
    const dispatch = useDispatch()
    const currentCartItems = useSelector(selectCartItems)

    const { name, imageUrl, quantity, price } = cartItem
    
    const addQtyHandler = () => dispatch(addItemToCart(currentCartItems, cartItem))
    const decQtyHandler = () => dispatch(removeItemFromCart(currentCartItems, cartItem))
    const clearItemHandler = () => dispatch(clearItemFromCart(currentCartItems, cartItem))

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