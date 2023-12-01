import { FC, useState } from "react";
import { FiMenu } from "react-icons/fi";

import Sidebar from "../sidebar/Sidebar.component";
import { MobileMenuContainer, MobileButton } from "./MobileMenu.styles";

type MobileMenuProps = {
    showToast: (type: string, message: string) => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ showToast }) => {
    const [isOpenSideBar, setIsOpenSideBar] = useState(false);

    return (
        <>
            {
                <MobileMenuContainer>
                    <MobileButton onClick={() => setIsOpenSideBar(!isOpenSideBar)}>
                        <FiMenu />
                    </MobileButton>
                    <Sidebar isMenuOpen={isOpenSideBar} onMenuClose={() => setIsOpenSideBar(false)} showToast={showToast} />
                </MobileMenuContainer>
            }
        </>
    )
}

export default MobileMenu;