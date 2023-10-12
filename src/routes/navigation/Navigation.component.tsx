
import { Outlet } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import CartIcon from "../../components/cart-icon/CartIcon.component"
import CartDropdown from "../../components/cart-dropdown/CartDropdown.component"
import { selectIsCartOpen } from "../../store/cart/Cart.selector"

import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import { selectCurrentUser, selectUserIsLoading } from "../../store/user/User.selector"

import { signOutStart } from "../../store/user/User.action"

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './Navigation.styles'
import { ButtonSpinner } from "../../components/button/Button.styles"

const Navigation = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)
    const checkUserSession = useSelector(selectUserIsLoading)
    
    const signOutUser = () => dispatch(signOutStart())

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
                    { checkUserSession ? (
                        <ButtonSpinner />
                    ) : (
                            currentUser ? (
                                <NavLink as='span' to='#' onClick={signOutUser}>
                                    SIGN OUT
                                </NavLink>
                            ) : (
                                <NavLink 
                                to='auth' 
                                >
                                    Sign In
                                </NavLink>
                            )
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