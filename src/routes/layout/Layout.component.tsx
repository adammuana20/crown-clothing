
import { useEffect } from 'react'
import { Outlet, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import Header from '../header/Header.component'
import DesktopMenu from '../desktop-menu/DesktopMenu.component'
import MobileMenu from '../mobile-menu/MobileMenu.component'
import Footer from '../footer/Footer.component'
import { usePopup } from '../../hooks/usePopup.hooks'

import { selectUserError } from "../../store/user/User.selector"

import { clearUserErrorMessage } from "../../store/user/User.action"
import { selectProductError } from "../../store/categories/Category.selector"
import { clearProductErrorMessage } from '../../store/categories/Category.action'

import { HeaderWrapper, HeaderContainer, OutletContainer, OutletMain } from './Layout.styles'
import PopUp from '../../components/ui/popup/PopUp.component'

const Layout = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { showToast, handleClose, toasts }  = usePopup()
    const userError = useSelector(selectUserError)
    const productErrorMessage = useSelector(selectProductError)

    const isSliderPage = location.pathname === '/'

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname])

    useEffect(() => {
        if(userError) {
            showToast('error', userError.message)
            dispatch(clearUserErrorMessage())
        }
        
        if(productErrorMessage) {
          dispatch(clearProductErrorMessage())
        }
    }, [userError])

    return (
        <>
            <HeaderWrapper>
                <HeaderContainer>
                    <Header />
                    <DesktopMenu showToast={showToast} />
                    <MobileMenu showToast={showToast} />
                </HeaderContainer>
            </HeaderWrapper>
            <OutletMain>
                <OutletContainer $isSliderPage={isSliderPage}>
                    <Outlet />
                </OutletContainer>
            </OutletMain>
            <Footer />
            <PopUp handleClose={handleClose} toasts={toasts} />
        </>
    )
}

export default Layout