import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ProductCard from '../../components/product/product-card/ProductCard.component'
import Spinner from '../../components/spinner/Spinner.component'
import MobileBottomMenu from '../mobile-bottom-menu/MobileBottomMenu.component'
import Button from '../../components/button/Button.component'
import PopUp from '../../components/ui/popup/PopUp.component'

import { usePopup } from '../../hooks/usePopup.hooks'

import { CategoryItem } from '../../store/categories/Category.types'

import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/Category.selector'

import { CategoryContainer, CategoryTitle, ButtonContainer } from './Category.styles'

type CategoryRouteParams = {
    category: string;
}

const Category = () => {
    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)
    const { showToast, handleClose, toasts } = usePopup()
    const [products, setProducts] = useState<CategoryItem[]>([])
    const [limit, setLimit] = useState(8)
    

    useEffect(() => {
        setProducts(categoriesMap[category] || [])
    }, [category, categoriesMap])

    const loadmore = () => {
        setLimit((prev) => prev + 4)
    }

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
                                products
                                .filter((_, idx) => idx < limit)
                                .map((product) => (
                                        <ProductCard key={product.id} product={product} categoryTitle={category} showToast={showToast} />
                                    )
                                )
                            }
                        </CategoryContainer>
                        <ButtonContainer>
                            { products.length <= limit ? 
                                null :
                                <Button onClick={loadmore}>Load More</Button>
                            }
                        </ButtonContainer>
                    </>
                ) : <h2>Category not found!</h2>
            }
            <PopUp handleClose={handleClose} toasts={toasts} />
            <MobileBottomMenu />
        </>
    )
}

export default Category