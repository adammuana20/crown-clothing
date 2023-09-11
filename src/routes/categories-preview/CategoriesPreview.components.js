import { useContext } from 'react'

import { CategoriesContext } from '../../contexts/Categories.context'
import CategoryPreview from '../../components/category-preview/CategoryPreview.components'

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext)

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