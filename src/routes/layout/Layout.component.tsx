
import { useEffect } from 'react'
import { Outlet, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import Header from '../header/Header.component'
import DesktopMenu from '../desktop-menu/DesktopMenu.component'
import MobileMenu from '../mobile-menu/MobileMenu.component'
import Footer from '../footer/Footer.component'

import { selectUserError, selectCurrentUser } from "../../store/user/User.selector"
import { useToast } from '../../contexts/Toast.context'

import { clearUserErrorMessage } from "../../store/user/User.action"
import { selectProductError } from "../../store/categories/Category.selector"
import { clearProductErrorMessage } from '../../store/categories/Category.action'
import { selectCartError } from '../../store/cart/Cart.selector'
import { clearCartErrorMessage } from '../../store/cart/Cart.action'

import { selectOrdersError } from '../../store/orders/Orders.selector'
import { clearOrdersErrorMessage } from '../../store/orders/Orders.action'

import { selectWishlistError } from '../../store/wishlist/Wishlist.selector'
import { clearWishlistErrorMessage } from '../../store/wishlist/Wishlist.action'

import { HeaderWrapper, HeaderContainer, OutletContainer, OutletMain } from './Layout.styles'
import ThemeSwitch from '../../components/theme-switch/ThemeSwitch.component'


const Layout = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { showToast } = useToast()
    const userError = useSelector(selectUserError)
    const productError = useSelector(selectProductError)
    const cartError = useSelector(selectCartError)
    const wishlistError = useSelector(selectWishlistError)
    const ordersError = useSelector(selectOrdersError)
    const currentUser = useSelector(selectCurrentUser)

    const isSliderPage = location.pathname === '/'

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname])

    useEffect(() => {
        if(userError) {
            showToast('error', userError.message)
            dispatch(clearUserErrorMessage())
        }

        if(wishlistError) {
            showToast('error', wishlistError.message)
            dispatch(clearWishlistErrorMessage())
        }
        
        if(productError) {
            showToast('error', productError.message)
          dispatch(clearProductErrorMessage())
        }

        if(cartError) {
            showToast('error', cartError.message)
            dispatch(clearCartErrorMessage())
        }

        if(ordersError) {
            showToast('error', ordersError.message)
            dispatch(clearOrdersErrorMessage())
        }

    }, [userError, cartError, wishlistError, productError, ordersError])

    return (
        <>
            <HeaderWrapper>
                { currentUser && <ThemeSwitch />}
                <HeaderContainer>
                    <Header />
                    <DesktopMenu />
                    <MobileMenu />
                </HeaderContainer>
            </HeaderWrapper>
            <OutletMain>
                <OutletContainer $isSliderPage={isSliderPage}>
                    <Outlet />
                </OutletContainer>
            </OutletMain>
            <Footer />
        </>
    )
}

export default Layout