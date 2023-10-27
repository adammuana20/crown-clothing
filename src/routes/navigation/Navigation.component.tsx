
import { useEffect } from 'react'
import { Outlet, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import CartIcon from "../../components/cart/cart-icon/CartIcon.component"
import CartDropdown from "../../components/cart/cart-dropdown/CartDropdown.component"
import { selectIsCartOpen } from "../../store/cart/Cart.selector"

import Search from "../search/Search.component"

import { ReactComponent as CrownLogo } from '../../assets/crown.svg'
import { selectCurrentUser, selectUserIsLoading, selectUserError } from "../../store/user/User.selector"

import { signOutStart, clearUserErrorMessage } from "../../store/user/User.action"
import { selectProductError } from "../../store/categories/Category.selector"
import { clearProductErrorMessage } from '../../store/categories/Category.action'

import { NavigationContainer, LogoContainer, NavLinks, StyledNavLink } from './Navigation.styles'
import { ButtonSpinner } from "../../components/button/Button.styles"

const Navigation = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen)
    const checkUserSession = useSelector(selectUserIsLoading)
    const location = useLocation()
    const userErrorMessage = useSelector(selectUserError)
    const productErrorMessage = useSelector(selectProductError)
    
    const signOutUser = () => dispatch(signOutStart())

    const activeStyle = {
        fontWeight: "bold",
        textDecoration: "underline",
        textUnderlineOffset: "0.2em",
    }

    useEffect(() => {
        if(userErrorMessage) {
          dispatch(clearUserErrorMessage())
        }
    
        if(productErrorMessage) {
          dispatch(clearProductErrorMessage())
        }
    }, [location.pathname])

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
                    { checkUserSession ? (
                        <ButtonSpinner />
                    ) : (
                            currentUser ? (
                                <>
                                    <StyledNavLink 
                                            to='product'
                                            style={({isActive}) => isActive ? activeStyle : {}}
                                    >
                                        Add Product
                                    </StyledNavLink>
                                    <StyledNavLink 
                                        as='span' 
                                        to='#' 
                                        onClick={signOutUser}
                                    >
                                        SIGN OUT
                                    </StyledNavLink>
                                </>
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