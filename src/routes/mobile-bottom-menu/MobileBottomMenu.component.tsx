import { useSelector } from 'react-redux';

import { FiHome, FiUser } from 'react-icons/fi'
import { BsShop } from "react-icons/bs";
import { IoCartOutline } from "react-icons/io5";

import { selectCartCount } from '../../store/cart/Cart.selector';

import { BottomMenu, ListContainer, BottomMenuNavLink, IconStyles, MobileItemCount } from './MobileBottomMenu.styles'

const MobileBottomMenu = () => {
    const cartCount = useSelector(selectCartCount)

    return (
        <BottomMenu>
            <ListContainer>
                <BottomMenuNavLink 
                    to='/'
                >
                    <IconStyles>
                        <FiHome />
                    </IconStyles>
                    Home
                </BottomMenuNavLink>
            </ListContainer>
            <ListContainer>
                <BottomMenuNavLink 
                    to='/shop'
                >
                    <IconStyles>
                        <BsShop />
                    </IconStyles>
                    Shop
                </BottomMenuNavLink>
            </ListContainer>
            <ListContainer>
                <BottomMenuNavLink 
                    to='/checkout'
                >
                    <IconStyles>
                        <IoCartOutline />
                        <MobileItemCount>{cartCount}</MobileItemCount>
                    </IconStyles>
                    Cart
                </BottomMenuNavLink>
            </ListContainer>
            <ListContainer>
                <BottomMenuNavLink 
                    to='/profile'
                >
                    <IconStyles>
                        <FiUser />
                    </IconStyles>
                    Profile
                </BottomMenuNavLink>
            </ListContainer>
        </BottomMenu>
    )
}

export default MobileBottomMenu