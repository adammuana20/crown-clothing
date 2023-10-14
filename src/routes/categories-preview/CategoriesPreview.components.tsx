import { useSelector } from 'react-redux'

import CategoryPreview from '../../components/category-preview/CategoryPreview.components'
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/Category.selector'
import Spinner from '../../components/spinner/Spinner.component'

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
        </>
    )
}

export default CategoriesPreview