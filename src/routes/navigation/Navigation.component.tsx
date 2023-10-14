
import { Outlet } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import CartIcon from "../../components/cart/cart-icon/CartIcon.component"
import CartDropdown from "../../components/cart/cart-dropdown/CartDropdown.component"
import { selectIsCartOpen } from "../../store/cart/Cart.selector"

import Search from "../search/Search.component"

import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import { selectCurrentUser, selectUserIsLoading } from "../../store/user/User.selector"

import { signOutStart } from "../../store/user/User.action"

import { NavigationContainer, LogoContainer, NavLinks, StyledNavLink } from './Navigation.styles'
import { ButtonSpinner } from "../../components/button/Button.styles"

const Navigation = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)
    const checkUserSession = useSelector(selectUserIsLoading)
    
    const signOutUser = () => dispatch(signOutStart())

    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        textUnderlineOffset: "0.2em",
    }

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
                    <StyledNavLink 
                            to='shop'
                            style={({isActive}) => isActive ? activeStyle : {}}
                    >
                        Shop
                    </StyledNavLink>
                    <StyledNavLink 
                            to='add-product'
                            style={({isActive}) => isActive ? activeStyle : {}}
                    >
                        Add Product
                    </StyledNavLink>
                    { checkUserSession ? (
                        <ButtonSpinner />
                    ) : (
                            currentUser ? (
                                <StyledNavLink 
                                    as='span' 
                                    to='#' 
                                    onClick={signOutUser}
                                >
                                    SIGN OUT
                                </StyledNavLink>
                            ) : (
                                <>
                                    <StyledNavLink 
                                        to='sign-in' 
                                        style={({isActive}) => isActive ? activeStyle : {}}
                                    >
                                        Sign In
                                    </StyledNavLink>
                                        <StyledNavLink 
                                        to='sign-up'
                                        style={({isActive}) => isActive ? activeStyle : {}}
                                    >
                                        Sign Up
                                    </StyledNavLink>
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