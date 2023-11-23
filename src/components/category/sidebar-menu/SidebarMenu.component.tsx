import { FC } from "react"
import { useSelector } from "react-redux"

import { selectCategories } from "../../../store/categories/Category.selector"

import { SidebarNavLinkContainer, MobileNavlink } from "../../../routes/sidebar/Sidebar.styles"

type SidebarMenuProps = {
    onMenuClose: () => void;
}

const SidebarMenu: FC<SidebarMenuProps> = ({ onMenuClose }) => {
    const categories = useSelector(selectCategories)

    return (
        <>
            { categories.map((category, idx) =>  (
                <SidebarNavLinkContainer key={idx}>
                    <MobileNavlink 
                        to={`shop/${category.title.toLocaleLowerCase()}`}
                        onClick={onMenuClose}
                    >
                        {category.title}
                    </MobileNavlink>
                </SidebarNavLinkContainer>
            ))}
        </>
    )
}

export default SidebarMenu