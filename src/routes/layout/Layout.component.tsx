
import { useEffect } from 'react'
import { Outlet, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import Header from '../header/Header.component'
import DesktopMenu from '../desktop-menu/DesktopMenu.component'
import MobileMenu from '../mobile-menu/MobileMenu.component'
import Footer from '../footer/Footer.component'

import { selectUserError } from "../../store/user/User.selector"

import { clearUserErrorMessage } from "../../store/user/User.action"
import { selectProductError } from "../../store/categories/Category.selector"
import { clearProductErrorMessage } from '../../store/categories/Category.action'

import { HeaderWrapper, HeaderContainer, OutletContainer, OutletMain } from './Layout.styles'

const Layout = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const userErrorMessage = useSelector(selectUserError)
    const productErrorMessage = useSelector(selectProductError)

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
            <HeaderWrapper>
                <HeaderContainer>
                    <Header />
                    <DesktopMenu />
                    <MobileMenu />
                </HeaderContainer>
            </HeaderWrapper>
            <OutletMain>
                <OutletContainer>
                    <Outlet />
                </OutletContainer>
            </OutletMain>
            <Footer />
        </>
    )
}

export default Layout