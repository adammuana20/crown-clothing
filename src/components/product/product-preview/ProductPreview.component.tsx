import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";

import { addItemToCart } from "../../../store/cart/Cart.action";
import { selectCartItems } from "../../../store/cart/Cart.selector";

import Button from "../../button/Button.component";
import MobileBottomMenu from "../../../routes/mobile-bottom-menu/MobileBottomMenu.component";
import WishlistButton from "../../wishlist/wishlist-button/WishlistButton.component";

import { selectCategoriesMap } from "../../../store/categories/Category.selector";

import { CategoryItem } from "../../../store/categories/Category.types";

import { ProductPreviewContainer, ProductImage, ProductInfo, ImageContainer, WishlistButtonContainer } from "./ProductPreview.styles";

const ProductPreview = () => {
    const params = useParams()
    const dispatch = useDispatch()

    const cartItems = useSelector(selectCartItems)
    const categoriesMap = useSelector(selectCategoriesMap)

    const productArr = Object.keys(categoriesMap).reduce((acc, title) => {
        const filteredProduct = categoriesMap[title].filter(product => product.id.toString() === params.id);
        return acc.concat(filteredProduct);
    }, [] as CategoryItem[]);


    const addProductToCart = () => dispatch(addItemToCart(cartItems, productArr[0]))
      
    const productElement = productArr.map((product) => 
    {   const { id, name, description, imageUrl, price } = product

        return (
        <ProductPreviewContainer key={id}>
            <ImageContainer>
                <ProductImage src={imageUrl} alt={name} />
            </ImageContainer>
            <ProductInfo>
                <WishlistButtonContainer>
                    <h2>{name}</h2>
                    <WishlistButton product={product} />
                </WishlistButtonContainer>
                <p>{description}</p>
                <p>${price}</p>
                <Button onClick={addProductToCart}>Add to cart</Button>
            </ProductInfo>
        </ProductPreviewContainer>
        )
    })
    
    
    return (
        <>
            {productElement.length > 0 ? (
                productElement
                ) : (
                    <h2>Product not found!</h2>
                )
            }
            <MobileBottomMenu/>
        </>
    )
}

export default ProductPreview