
import { Outlet } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import CartIcon from "../../components/cart-icon/CartIcon.component"
import CartDropdown from "../../components/cart-dropdown/CartDropdown.component"
import { selectIsCartOpen } from "../../store/cart/Cart.selector"

import Search from "../search/Search.component"

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
            <NavigationContainer>
                <LogoContainer 
                    to='/'
                >
                    <CrownLogo/>
                </LogoContainer>
                <NavLinks>
                    <Search />
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
                                <>
                                    <NavLink 
                                    to='sign-in' 
                                    >
                                        Sign In
                                    </NavLink>
                                        <NavLink 
                                        to='sign-up'
                                    >
                                        Sign Up
                                    </NavLink>
                                </>
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