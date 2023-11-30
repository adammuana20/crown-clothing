import { FC } from 'react'

import ProductCard from '../../product/product-card/ProductCard.component'
import PopUp from '../../ui/popup/PopUp.component'

import { usePopup } from '../../../hooks/usePopup.hooks'

import { CategoryItem } from '../../../store/categories/Category.types'

import { CategoryPreviewContainer, Preview, Title } from './CategoryPreview.styles'


type CategoryPreviewProps = {
    title: string;
    products: CategoryItem[];
}

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
    const { showToast, handleClose, toasts } = usePopup()

    return (
        <CategoryPreviewContainer>
            <h2>
                <Title to={title}>{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                {
                    products
                    .filter((_, idx) => idx < 4)
                    .map((product) => (
                        <ProductCard key={product.id} product={product} categoryTitle={title} showToast={showToast} />
                    ))
                }
            </Preview>
            <PopUp handleClose={handleClose} toasts={toasts} />
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview