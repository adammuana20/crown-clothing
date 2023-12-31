import { FC } from 'react'

import WishlistButton from '../../wishlist/wishlist-button/WishlistButton.component'

import { CategoryItem } from '../../../store/categories/Category.types'

import { 
    ProductCardContainer, 
    Footer, 
    Price, 
    ProductLink, 
    WishlistContainer,
    ProductCardWrapper,
    WishlistRibbon,
} from './ProductCard.styles'

type ProductCardProps = {
    product: CategoryItem;
    categoryTitle: string;
}

const ProductCard: FC<ProductCardProps> = ({ product, categoryTitle }) => {
    const { id, name, price, imageUrl } = product

    return (
        <ProductCardWrapper>
            <WishlistRibbon/>
            <WishlistContainer>
                <WishlistButton product={product} category={categoryTitle} />
            </WishlistContainer>
            <ProductCardContainer>
                <ProductLink to={`/shop/${categoryTitle}/${id}`}>
                    <img src={imageUrl} alt={`${name}`} />
                </ProductLink>
                <Footer>
                    <span>{name}</span>
                    <Price>${price}</Price>
                </Footer>
            </ProductCardContainer>
        </ProductCardWrapper>
    )
}

export default ProductCard