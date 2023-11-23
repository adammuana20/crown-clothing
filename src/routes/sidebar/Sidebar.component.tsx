import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/User.selector";

import { signOutStart } from "../../store/user/User.action";

import SidebarMenu from "../../components/category/sidebar-menu/SidebarMenu.component";

import { LogoutButton } from "../desktop-menu/DesktopMenu.styles";

import { 
    SidebarContainer, 
    SidebarOverlay, 
    SidebarNavLinkContainer, 
    MobileNavlink, 
    SidebarTitleContainer,
} from "./Sidebar.styles";

type SidebarProps = {
    isMenuOpen: boolean;
    onMenuClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isMenuOpen, onMenuClose }) => {
    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser)
    const navigate = useNavigate()

    const loginPage = () => {
        onMenuClose()
        navigate('/sign-in')
    }

    const signOutUser = () => {
        onMenuClose()
        dispatch(signOutStart(navigate))
    }

    return (
        <>  
                <SidebarContainer $isMenuOpen={isMenuOpen}>
                <SidebarNavLinkContainer>
                    <MobileNavlink 
                            to='/'
                            onClick={onMenuClose}
                    >
                        Home
                    </MobileNavlink>
                </SidebarNavLinkContainer>
                <SidebarTitleContainer>
                    <span>Categories</span>
                </SidebarTitleContainer>
                <SidebarMenu onMenuClose={onMenuClose}/>
                { currentUser ? (
                    <>
                        <SidebarTitleContainer>
                            <span>Account</span>
                        </SidebarTitleContainer>
                        <SidebarNavLinkContainer>
                            <MobileNavlink 
                                    to='orders'
                                    onClick={onMenuClose}
                            >
                                My Orders
                            </MobileNavlink>
                        </SidebarNavLinkContainer>
                        <SidebarNavLinkContainer>
                            <MobileNavlink 
                                    to='wishlist'
                                    onClick={onMenuClose}
                            >
                                My Wishlist
                            </MobileNavlink>
                        </SidebarNavLinkContainer>
                        <SidebarNavLinkContainer>
                            <LogoutButton onClick={signOutUser} >Logout</LogoutButton>
                        </SidebarNavLinkContainer>
                    </>
                ) : (
                    <SidebarNavLinkContainer>
                        <LogoutButton onClick={loginPage} >Login</LogoutButton>
                    </SidebarNavLinkContainer>
                )}
                </SidebarContainer>

            { isMenuOpen && (
                <SidebarOverlay onClick={onMenuClose}/>
                )
            }
        </>
    )
}

export default Sidebar;