import { useSelector } from 'react-redux';

import DirectoryItem from '../directory-item/DirectoryItem.component';
import MobileBottomMenu from '../../../routes/mobile-bottom-menu/MobileBottomMenu.component';

import { selectCategories } from '../../../store/categories/Category.selector';

import { DirectoryContainer } from './Directory.styles'


const Directory = () => {
    const categories = useSelector(selectCategories)
    
    return (
        <>
            <DirectoryContainer>
                {categories.map((category, idx) => (
                    <DirectoryItem key={idx} category={category} />
                ))}
            </DirectoryContainer>
            <MobileBottomMenu />
        </>
    )
}

export default Directory