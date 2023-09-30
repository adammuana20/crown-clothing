import DirectoryItem from '../directory-item/DirectoryItem.component';

import { DirectoryContainer } from './Directory.styles'
import { categories } from '../categoriesData'


const Directory = () => {
    return (
        <DirectoryContainer>
            {categories.map((category) => (
                <DirectoryItem key={category.id} category={category} />
            ))}
      </DirectoryContainer>
    )
}

export default Directory