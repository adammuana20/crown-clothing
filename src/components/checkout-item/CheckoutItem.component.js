import { useContext } from 'react'
import { CartContext } from '../../contexts/Cart.context'

import './CheckoutItem.styles.scss'

const CheckoutItem = ({ cartItem }) => {
    const { addItemToCart, removeItemFromCart, clearItemFromCart } = useContext(CartContext)
    const { name, imageUrl, quantity, price } = cartItem
    
    const addQtyHandler = () => addItemToCart(cartItem)
    const decQtyHandler = () => removeItemFromCart(cartItem)
    const clearItemHandler = () => clearItemFromCart(cartItem)

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={name} />
            </div>
            <span className='name'>{name}</span>
            <div className='quantity'>
                <div className='arrow' onClick={decQtyHandler}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addQtyHandler}>&#10095;</div>
            </div>
            <span className='price'>{price}</span>
            <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem