import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ProductCard from '../../components/product-card/ProductCard.component'
import { selectCategoriesMap } from '../../store/categories/Category.selector'

import { CategoryContainer, CategoryTitle } from './Category.styles.js'

const Category = () => {
    const { category } = useParams()
    // const { categoriesMap } = useContext(CategoriesContext)
    const categoriesMap = useSelector(selectCategoriesMap)
    const [products, setProducts] = useState(categoriesMap[category])

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {
                    products &&
                    products.map((product) => (<ProductCard key={product.id} product={product} />))
                }
            </CategoryContainer>
        </>
    )
}

export default Category