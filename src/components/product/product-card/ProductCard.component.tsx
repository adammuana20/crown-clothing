import { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Button, { BUTTON_TYPE_CLASSES } from '../../button/Button.component'
import WishlistButton from '../../wishlist/wishlist-button/WishlistButton.component'

import { addItemToCart } from '../../../store/cart/Cart.action'
import { selectCartItems } from '../../../store/cart/Cart.selector'
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
    isFromShopRoute: boolean;
}

const ProductCard: FC<ProductCardProps> = ({ product, categoryTitle, isFromShopRoute }) => {
    const dispatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const { id, name, price, imageUrl } = product    

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product))    

    return (
        <ProductCardWrapper>
            <WishlistRibbon/>
            <WishlistContainer>
                <WishlistButton product={product} category={categoryTitle} />
            </WishlistContainer>
            <ProductCardContainer>
                <ProductLink to={isFromShopRoute ? `${categoryTitle}/${id}` : `${id}`}>
                    <img src={imageUrl} alt={`${name}`} />
                </ProductLink>
                <Footer>
                    <span>{name}</span>
                    <Price>${price}</Price>
                </Footer>
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
            </ProductCardContainer>
        </ProductCardWrapper>
    )
}

export default ProductCard