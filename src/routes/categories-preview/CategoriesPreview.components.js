import { useSelector } from 'react-redux'

import CategoryPreview from '../../components/category-preview/CategoryPreview.components'
import { selectCategoriesMap } from '../../store/categories/Category.selector'

const CategoriesPreview = () => {
    // const { categoriesMap } = useContext(CategoriesContext)
    const categoriesMap = useSelector(selectCategoriesMap)

    return (
        <>
            {
                Object.keys(categoriesMap).map(title => {
                    const products = categoriesMap[title]
                    return <CategoryPreview key={title} title={title} products={products} />
                })
            }
        </>
    )
}

export default CategoriesPreview