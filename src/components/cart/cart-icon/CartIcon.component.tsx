import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CartDropdown from '../cart-dropdown/CartDropdown.component'

import { selectIsCartOpen, selectCartCount } from '../../../store/cart/Cart.selector'
import { setIsCartOpen } from '../../../store/cart/Cart.action'

import { ShoppingIcon, CartIconContainer, ItemCount } from './CartIcon.styles'

const CartIcon = () => {
    // const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)
    const dispatch = useDispatch()
    
    const isCartOpen = useSelector(selectIsCartOpen)
    const cartCount = useSelector(selectCartCount)
    
    const toggleIsCartOpen = () => {         
        dispatch(setIsCartOpen(!isCartOpen))
    }

    //CART DROPDOWN HIDE WHEN CLICK OUTSIDE THE DIV
    const cartDropdownRef = useRef<HTMLDivElement>(null);

    const handleCartClickOutside = (event: MouseEvent) => {
        if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target as Node)) {
            dispatch(setIsCartOpen(false))
        }
    };

    useEffect(() => {
        if(isCartOpen) {
            window.addEventListener('click', handleCartClickOutside);
        }
    
        return () => {
            window.removeEventListener('click', handleCartClickOutside);
        };
    }, [isCartOpen]);

    return (
        <CartIconContainer ref={cartDropdownRef}>
            <ShoppingIcon onClick={toggleIsCartOpen}/>
            { cartCount !== 0 ?
                <ItemCount>{cartCount}</ItemCount>
                : null
            }
            { isCartOpen && <CartDropdown toggleCartClose={() => dispatch(setIsCartOpen(false))}/>}
        </CartIconContainer>
    )
}

export default CartIcon