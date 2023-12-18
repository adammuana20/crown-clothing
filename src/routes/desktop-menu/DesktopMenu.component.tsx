
import { useRef, useState, useEffect, FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"

import CartIcon from "../../components/cart/cart-icon/CartIcon.component"

import Search from "../search/Search.component"

import { selectCurrentUser } from "../../store/user/User.selector"

import { signOutStart } from "../../store/user/User.action"

import { capitalizeFirstLetter } from '../../utils/helpers/Helpers.utils'
import { FaRegUser } from "react-icons/fa";

import { NavLinks, DesktopNavLink, UserIcon, UserTextContainer, MenuDropdownContainer, LogoutButton } from './DesktopMenu.styles'
import { SidebarNavLinkContainer } from '../sidebar/Sidebar.styles'
import { useToast } from '../../contexts/Toast.context'


const DesktopMenu = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { showToast } = useToast()
    const currentUser = useSelector(selectCurrentUser)

    const [isOpenMenuDropdown, setIsOpenMenuDropdown] = useState(false);
    const dropdownRef = useRef<HTMLLIElement>(null);

    const handleMenuDropDown = () => {
        setIsOpenMenuDropdown(!isOpenMenuDropdown)
    };

    const signOutUser = () => {
        dispatch(signOutStart(navigate, showToast))
    }

    useEffect(() => {
        if(isOpenMenuDropdown) {
            window.addEventListener('click', handleClickOutSide);
        }

    }, [isOpenMenuDropdown]);

    const handleClickOutSide = (e: MouseEvent) => {
        const { target } = e;
        if (target instanceof Node && dropdownRef.current?.contains(target)) {
            return;
        }
        
        setIsOpenMenuDropdown(false);
    };

    return (
        <>
            <NavLinks>
                <Search />
                <DesktopNavLink 
                        to='shop'
                >
                    Shop
                </DesktopNavLink>
                <CartIcon />
                {   currentUser ? (
                        <li ref={dropdownRef}>
                            <UserIcon
                                role="button"
                                tabIndex={-1}
                                onClick={handleMenuDropDown}
                                aria-expanded={isOpenMenuDropdown ? true : false}
                            >
                                <UserTextContainer>
                                    { currentUser.imageUrl ? 
                                        <img src={currentUser.imageUrl} alt='Avatar' />
                                        : currentUser.displayName ?
                                            capitalizeFirstLetter(currentUser.displayName)
                                        : <FaRegUser size={27} />
                                    }
                                </UserTextContainer>
                            </UserIcon>
                            { isOpenMenuDropdown && (
                                <MenuDropdownContainer>
                                    <DesktopNavLink 
                                            to='profile'
                                            onClick={handleMenuDropDown}
                                    >
                                        My Profile
                                    </DesktopNavLink>
                                    { currentUser.roles && currentUser.roles.includes('admin') && (
                                        <DesktopNavLink 
                                                to='product'
                                                onClick={handleMenuDropDown}
                                        >
                                            Add Product
                                        </DesktopNavLink>
                                    )}
                                    <DesktopNavLink 
                                            to='orders'
                                            onClick={handleMenuDropDown}
                                    >
                                        My Orders
                                    </DesktopNavLink>
                                    <DesktopNavLink 
                                            to='wishlist'
                                            onClick={handleMenuDropDown}
                                    >
                                        My Wishlist
                                    </DesktopNavLink>
                                    <SidebarNavLinkContainer>
                                        <LogoutButton 
                                            onClick={signOutUser}
                                        >
                                            SIGN OUT
                                        </LogoutButton>
                                    </SidebarNavLinkContainer>
                                </MenuDropdownContainer>
                            )}
                        </li>
                    ) : (
                        <>
                            <DesktopNavLink 
                                to='sign-in' 
                            >
                                Sign In
                            </DesktopNavLink>
                                <DesktopNavLink 
                                to='sign-up'
                            >
                                Sign Up
                            </DesktopNavLink>
                        </>
                    )
                }
            </NavLinks>
        </>
    )
}

export default DesktopMenu