import { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addItemToCart } from '../../store/cart/Cart.action'
import { selectCartItems } from '../../store/cart/Cart.selector'
import Button, { BUTTON_TYPE_CLASSES } from '../button/Button.component'
import { CategoryItem } from '../../store/categories/Category.types'

import { ProductCardContainer, Footer, Name, Price } from './ProductCard.styles'

type ProductCardProps = {
    product: CategoryItem;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch()
    // const { addItemToCart } = useContext(CartContext)
    const cartItems = useSelector(selectCartItems)
    const { name, price, imageUrl } = product

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product))

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
        </ProductCardContainer>
    )
}

export default ProductCard