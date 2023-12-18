import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";

import { useToast } from "../../../contexts/Toast.context";

import { addItemsToCartStart } from "../../../store/cart/Cart.action";

import { selectAddingItemToCart } from "../../../store/cart/Cart.selector"

import Button from "../../button/Button.component";
import MobileBottomMenu from "../../../routes/mobile-bottom-menu/MobileBottomMenu.component";
import WishlistButton from "../../wishlist/wishlist-button/WishlistButton.component";
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
    ItemPreview,
    GoBackLink,
    Price,
} from "./ProductPreview.styles";
import { selectCurrentUser } from "../../../store/user/User.selector";

const ProductPreview = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const { category } = params
    const { showToast } = useToast()
    const navigate = useNavigate()
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectAddingItemToCart)
    const currentUser = useSelector(selectCurrentUser)

    const [qty, setQty] = useState<string | number>(1)
    const productArr = Object.keys(categoriesMap).reduce((acc, title) => {
        const filteredProduct = categoriesMap[title].filter(product => product.id.toString() === params.id);
        return acc.concat(filteredProduct);
    }, [] as CategoryItem[]);


    useEffect(() => {
        setQty(1)
    }, [params.id])
    
    if(!category) return <h2>Product not found</h2>

    const onChangeInput = (value: string | number) => {
        if(Number(value) >= 10) {
            showToast('warning', 'Up to 10 max input only!')
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
            showToast('warning', 'Up to 10 max input only!')
            setQty(10);
            return
        }

        setQty((qty) => (Number(qty) + 1))
    }

    const decQtyHandler = () => {
        if(Number(qty) <= 1) {
            setQty(1);
            return
        }

        setQty((qty) => (Number(qty) - 1))
    }
    
      
    const productElement = productArr.map((product) => 
    {   const { id, name, description, imageUrl, price } = product
        const addProductToCart = () => {
            if(!currentUser) {
                navigate('/sign-in')
                showToast('error', 'You must login first!')
                return
            }
            dispatch(addItemsToCartStart(product, Number(qty), category, showToast))
        }

        return (
            <ProductPreviewContainer key={id}>
                <GoBackLink to='..'>
                    &lt; &lt; Go Back
                </GoBackLink>
                <ItemPreview>
                    <ImageContainer>
                        <ProductImage src={imageUrl} alt={name} />
                    </ImageContainer>
                    <ProductInfo>
                        <WishlistButtonContainer>
                            <h2>{name}</h2>
                            <WishlistButton product={product} category={category} />
                        </WishlistButtonContainer>
                        <p>{description}</p>
                        <Price>${price}</Price>
                        <ProductInputContainer>
                            <ProductInputQuantity value={qty} onChangeQty={onChangeInput} onChangeBlur={onChangeBlur} addQtyHandler={addQtyHandler} decQtyHandler={decQtyHandler} />
                        </ProductInputContainer>
                        <Button onClick={addProductToCart} isLoading={isLoading}>Add to cart</Button>
                    </ProductInfo>
                </ItemPreview>
            </ProductPreviewContainer>
        )
    })
    
    
    return (
        <>
            {productElement.length > 0 ? (
                <>
                    {productElement}
                    <RelatedProducts category={category} catID={params.id} />
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

