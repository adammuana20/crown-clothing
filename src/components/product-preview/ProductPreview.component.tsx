import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";

import { addItemToCart } from "../../store/cart/Cart.action";
import { selectCartItems } from "../../store/cart/Cart.selector";

import Button from "../button/Button.component";
import { BUTTON_TYPE_CLASSES } from "../button/Button.component";
import { selectCategoriesMap } from "../../store/categories/Category.selector";

import { CategoryItem } from "../../store/categories/Category.types";

import { ProductPreviewContainer, ProductImage, ProductInfo, Category } from "./ProductPreview.styles";

const ProductPreview = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const category = params.category as string

    const cartItems = useSelector(selectCartItems)
    const categoriesMap = useSelector(selectCategoriesMap)

    const productArr = Object.keys(categoriesMap).reduce((acc, title) => {
        const filteredProduct = categoriesMap[title].filter(product => product.id.toString() === params.id);
        return acc.concat(filteredProduct);
    }, [] as CategoryItem[]);


    const addProductToCart = () => dispatch(addItemToCart(cartItems, productArr[0]))
      
    const productElement = productArr.map(({ id, name, description, imageUrl, price }) => (
        <ProductPreviewContainer key={id}>
            <ProductImage src={imageUrl} alt={name} />
            <ProductInfo>
                <h2>{name}</h2>
                <Category>{category.toUpperCase()}</Category>
                <p>{description}</p>
                <p>${price}</p>
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
            </ProductInfo>
        </ProductPreviewContainer>
    ))
    
    return (
        <>
            {productElement}
        </>
    )
}

export default ProductPreview