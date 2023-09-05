import { useContext } from "react"
import { NavLink, Outlet } from "react-router-dom"

import CartIcon from "../../components/cart-icon/CartIcon.component"
import CartDropdown from "../../components/cart-dropdown/CartDropdown.component"

import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import { UserContext } from "../../contexts/User.context"
import { CartContext } from "../../contexts/Cart.context"

import { signOutUser } from "../../utils/firebase/Firebase.utils"

import './Navigation.styles.scss'

const Navigation = () => {
    const { currentUser } = useContext(UserContext)
    const { isCartOpen } = useContext(CartContext)

    return (
        <>
            <nav className='navigation'>
                <NavLink 
                    to='/'
                    className='logo-container'
                >
                    <CrownLogo className='logo' />
                </NavLink>
                <div className='nav-links-container'>
                    <NavLink 
                            to='shop'
                            className='nav-link'
                    >
                        Shop
                    </NavLink>
                    <NavLink 
                        to='contact' 
                        className='nav-link' 
                    >
                    Contact
                    </NavLink>
                    {
                        currentUser ? (
                            <span 
                                className='nav-link' 
                                onClick={signOutUser}
                            >
                                SIGN OUT
                            </span>
                        ) : (
                            <NavLink 
                            to='auth' 
                            className='nav-link' 
                            >
                                Sign In
                            </NavLink>
                        )
                    }
                    <CartIcon />
                </div>
                { isCartOpen && <CartDropdown />}
            </nav>
            <Outlet />
        </>
    )
}

export default Navigation