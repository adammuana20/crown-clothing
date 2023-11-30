import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";

import { addItemsToCartStart, clearCartErrorMessage } from "../../../store/cart/Cart.action";
import { usePopup } from "../../../hooks/usePopup.hooks";

import { selectAddingItemToCart, selectCartError } from "../../../store/cart/Cart.selector"

import Button from "../../button/Button.component";
import MobileBottomMenu from "../../../routes/mobile-bottom-menu/MobileBottomMenu.component";
import WishlistButton from "../../wishlist/wishlist-button/WishlistButton.component";
import PopUp from "../../ui/popup/PopUp.component";
import ProductInputQuantity from "../product-input-quantity/ProductInputQuantity.component";
import RelatedProducts from "../related-products/RelatedProducts.component";

import { selectCategoriesMap } from "../../../store/categories/Category.selector";

import { CategoryItem } from "../../../store/categories/Category.types";

import { 
    ProductPreviewContainer, 
    ProductImage, 
    ProductInfo, 
    ImageContainer, 
    WishlistButtonContainer, 
    ProductInputContainer, 
} from "./ProductPreview.styles";

const ProductPreview = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const { category } = params
    const { showToast, handleClose, toasts } = usePopup()
    const categoriesMap = useSelector(selectCategoriesMap)
    const [qty, setQty] = useState<string | number>(1)
    const isLoading = useSelector(selectAddingItemToCart)
    const cartError = useSelector(selectCartError)

    const productArr = Object.keys(categoriesMap).reduce((acc, title) => {
        const filteredProduct = categoriesMap[title].filter(product => product.id.toString() === params.id);
        return acc.concat(filteredProduct);
    }, [] as CategoryItem[]);


    useEffect(() => {
        setQty(1)
    }, [params.id])

    useEffect(() => {
        if(cartError) {
            showToast('error', cartError.message)
            dispatch(clearCartErrorMessage())
        }
    }, [cartError])
    
    if(!category) return <h2>Product not found</h2>

  

    const onChangeInput = (value: string | number) => {
        if(Number(value) >= 10) {
            console.log('error', 'Ops up to 10 max only');
            setQty(10);
            return
        }
        setQty(value)
    }

    const onChangeBlur = (value: string) => {
        if(!value) {
            setQty(1)
        } else if(Number(value) === 0) {
            setQty(1)
        }
    }

    const addQtyHandler = () => {
        if(Number(qty) >= 10) {
            console.log('error', 'Ops up to 10 max only');
            setQty(10);
            return
        }

        setQty((qty) => (Number(qty) + 1))
    }

    const decQtyHandler = () => {
        if(Number(qty) <= 1) {
            console.log('error', 'Ops up to 1 minimum only');
            setQty(1);
            return
        }

        setQty((qty) => (Number(qty) - 1))
    }
    
      
    const productElement = productArr.map((product) => 
    {   const { id, name, description, imageUrl, price } = product
        const addProductToCart = () => {
            if(cartError) {
                dispatch(clearCartErrorMessage())
            }
            dispatch(addItemsToCartStart(product, Number(qty), category, showToast))
        }

        return (
            <ProductPreviewContainer key={id}>
                <ImageContainer>
                    <ProductImage src={imageUrl} alt={name} />
                </ImageContainer>
                <ProductInfo>
                    <WishlistButtonContainer>
                        <h2>{name}</h2>
                        <WishlistButton product={product} category={category} />
                    </WishlistButtonContainer>
                    <p>{description}</p>
                    <p>${price}</p>
                    <ProductInputContainer>
                        <ProductInputQuantity value={qty} onChangeQty={onChangeInput} onChangeBlur={onChangeBlur} addQtyHandler={addQtyHandler} decQtyHandler={decQtyHandler} />
                    </ProductInputContainer>
                    <Button onClick={addProductToCart} isLoading={isLoading}>Add to cart</Button>
                </ProductInfo>
            </ProductPreviewContainer>
        )
    })
    
    
    return (
        <>
            {productElement.length > 0 ? (
                <>
                    {productElement}
                    <RelatedProducts category={category} catID={params.id} />
                    <PopUp handleClose={() => handleClose} message={'Added to Cart!'} toasts={toasts} />
                </>
                ) : (
                    <h2>Product not found!</h2>
                )
            }
            <MobileBottomMenu/>
        </>
    )
}

export default ProductPreview

