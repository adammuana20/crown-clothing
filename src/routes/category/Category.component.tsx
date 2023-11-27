import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ProductCard from '../../components/product/product-card/ProductCard.component'
import Spinner from '../../components/spinner/Spinner.component'
import MobileBottomMenu from '../mobile-bottom-menu/MobileBottomMenu.component'

import { CategoryItem } from '../../store/categories/Category.types'

import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/Category.selector'

import { CategoryContainer, CategoryTitle } from './Category.styles'

type CategoryRouteParams = {
    category: string;
}

const Category = () => {
    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)
    const [products, setProducts] = useState<CategoryItem[]>([])
    

    useEffect(() => {
        setProducts(categoriesMap[category] || [])
    }, [category, categoriesMap])

    return (
        <>
            { isLoading ? (
                    <Spinner />
                ) : products.length > 0 ? ( 
                    <>
                        <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
                        <CategoryContainer>
                            {
                                products &&
                                products.map((product) => (
                                        <ProductCard key={product.id} product={product} categoryTitle={category} />
                                    )
                                )
                            }
                        </CategoryContainer>
                    </>
                ) : <h2>Category not found!</h2>
            }
            <MobileBottomMenu />
        </>
    )
}

export default Category