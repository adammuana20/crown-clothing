import { useSelector } from 'react-redux'
import { useState } from 'react'

import Button from '../../button/Button.component'
import CategoryPreview from '../category-preview/CategoryPreview.components'
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../../store/categories/Category.selector'
import Spinner from '../../spinner/Spinner.component'
import MobileBottomMenu from '../../../routes/mobile-bottom-menu/MobileBottomMenu.component'
import { ButtonContainer } from '../../../routes/category/Category.styles'



const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)
    const [limit, setLimit] = useState(4)

    const loadmore = () => {
        setLimit((prev) => prev + 4)
    }

    return (
        <>
            { isLoading ? (<Spinner />)
                : (
                Object.keys(categoriesMap)
                .filter((_, idx) => idx < limit)
                .map(title => {
                    const products = categoriesMap[title]
                    return <CategoryPreview key={title} title={title} products={products} />
                }))
            }
            <ButtonContainer>
            { Object.keys(categoriesMap).length <= limit ? 
                    null :
                    <Button onClick={loadmore}>Load More</Button>
            }
            </ButtonContainer>
            <MobileBottomMenu />
        </>
    )
}

export default CategoriesPreview