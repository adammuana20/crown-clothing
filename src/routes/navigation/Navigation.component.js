import { useContext } from "react"
import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

import CartIcon from "../../components/cart-icon/CartIcon.component"
import CartDropdown from "../../components/cart-dropdown/CartDropdown.component"
import { selectIsCartOpen } from "../../store/cart/Cart.selector"

import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import { UserContext } from "../../contexts/User.context"
import { CartContext } from "../../contexts/Cart.context"
import { selectCurrentUser } from "../../store/user/User.selector"

import { signOutUser } from "../../utils/firebase/Firebase.utils"

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './Navigation.styles'

const Navigation = () => {
    // const { currentUser } = useContext(UserContext)
    // const { isCartOpen } = useContext(CartContext)
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)

    return (
        <>
            <NavigationContainer className='navigation'>
                <LogoContainer 
                    to='/'
                >
                    <CrownLogo className='logo' />
                </LogoContainer>
                <NavLinks>
                    <NavLink 
                            to='shop'
                    >
                        Shop
                    </NavLink>
                    {/* <NavLink 
                        to='contact' 
                    >
                    Contact
                    </NavLink> */}
                    {
                        currentUser ? (
                            <NavLink as='span'
                                onClick={signOutUser}
                            >
                                SIGN OUT
                            </NavLink>
                        ) : (
                            <NavLink 
                            to='auth' 
                            >
                                Sign In
                            </NavLink>
                        )
                    }
                    <CartIcon />
                </NavLinks>
                { isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </>
    )
}

export default Navigation