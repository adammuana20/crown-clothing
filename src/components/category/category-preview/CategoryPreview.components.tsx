import { FC } from 'react'

import ProductCard from '../../product/product-card/ProductCard.component'

import { CategoryItem } from '../../../store/categories/Category.types'

import { CategoryPreviewContainer, Preview, Title } from './CategoryPreview.styles'


type CategoryPreviewProps = {
    title: string;
    products: CategoryItem[];
}

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {

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
                        <ProductCard key={product.id} product={product} categoryTitle={title} />
                    ))
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview