import { FC } from 'react'
import ProductCard from '../product-card/ProductCard.component'

import { CategoryPreviewContainer, Preview, Title } from './CategoryPreview.styles'
import { CategoryItem } from '../../store/categories/Category.types'

type CategoryPreviewProps = {
    title: string;
    products: CategoryItem[];
}

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <Title to={title} className='title'>{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                {
                    products
                    .filter((_, idx) => idx < 4)
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </Preview>
        </CategoryPreviewContainer>
    )
}

export default CategoryPreview