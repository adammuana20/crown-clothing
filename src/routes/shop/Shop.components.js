import { useContext } from 'react'

import { CategoriesContext } from '../../contexts/Categories.context'
import CategoryPreview from '../../components/category-preview/CategoryPreview.components'

import './Shop.styles.scss'

const Shop = () => {
    const { categoriesMap } = useContext(CategoriesContext)

    return (
        <div className='shop-container'>
            {
                Object.keys(categoriesMap).map(title => {
                    const products = categoriesMap[title]
                    console.log(products);
                    return <CategoryPreview key={title} title={title} products={products} />
                })
            }
        </div>
    )
}

export default Shop