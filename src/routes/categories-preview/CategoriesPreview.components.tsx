import { useSelector } from 'react-redux'

import CategoryPreview from '../../components/category/category-preview/CategoryPreview.components'
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/Category.selector'
import Spinner from '../../components/spinner/Spinner.component'
import MobileBottomMenu from '../mobile-bottom-menu/MobileBottomMenu.component'

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)

    return (
        <>
            { isLoading ? (<Spinner />)
                : (
                Object.keys(categoriesMap).map(title => {
                    const products = categoriesMap[title]
                    return <CategoryPreview key={title} title={title} products={products} />
                }))
            }
            <MobileBottomMenu />
        </>
    )
}

export default CategoriesPreview