import { FC, memo } from 'react'

import { CartItemContainer, ItemDetails } from './CartItem.styles'
import { CartItem as TCartItem } from '../../store/cart/Cart.types'

export type CartItemProps = {
    cartItem: TCartItem
}

const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <span>{name}</span>
                <span>{quantity} x ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    )
})

export default CartItem