import { useContext } from 'react'

import { CartContext } from '../../contexts/Cart.context'

import Button from '../button/Button.component'
import CartItem from '../cart-item/CartItem.component'

import './CartDropdown.styles.scss'

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext)
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items' >
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            <Button>Go to Checkout</Button>
        </div>
    )
}

export default CartDropdown