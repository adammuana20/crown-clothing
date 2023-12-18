import { useState } from "react";
import { FiMenu } from "react-icons/fi";

import Sidebar from "../sidebar/Sidebar.component";
import { MobileMenuContainer, MobileButton } from "./MobileMenu.styles";

const MobileMenu = () => {
    const [isOpenSideBar, setIsOpenSideBar] = useState(false);

    return (
        <MobileMenuContainer>
            <MobileButton onClick={() => setIsOpenSideBar(!isOpenSideBar)}>
                <FiMenu />
            </MobileButton>
            <Sidebar isMenuOpen={isOpenSideBar} onMenuClose={() => setIsOpenSideBar(false)} />
        </MobileMenuContainer>
    )
}

export default MobileMenu;