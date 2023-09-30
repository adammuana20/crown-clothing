import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ProductCard from '../../components/product-card/ProductCard.component'
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/Category.selector'
import Spinner from '../../components/spinner/Spinner.component'

import { CategoryContainer, CategoryTitle } from './Category.styles'

type CategoryRouteParams = {
    category: string;
}

const Category = () => {
    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)
    const [products, setProducts] = useState(categoriesMap[category])

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            { isLoading ? (
                    <Spinner />
                ) : (
                    <CategoryContainer>
                        {
                            products &&
                            products.map((product) => (<ProductCard key={product.id} product={product} />))
                        }
                    </CategoryContainer>
                )
            }
        </>
    )
}

export default Category