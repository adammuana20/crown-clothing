import { useState, FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { clearWishlistErrorMessage, createWishlistItemStart, removeWishlistItemStart } from "../../../store/wishlist/Wishlist.action";
import { selectWishlist, selectWishlistError } from "../../../store/wishlist/Wishlist.selector";

import { CategoryItem } from "../../../store/categories/Category.types";

import { WishlistItemButton, StyledOutlineHeart, StyledFillHeart } from "./WishlistButton.styles";


type WishlistButtonProps = {
    product: CategoryItem;
    category?: string;
    showToast: (type: string, message: string) => void;
}

export type WishlistProduct = {
    item: CategoryItem;
    createdAt: Date;
    category: string;
}

const WishlistButton: FC<WishlistButtonProps> = ({ product, category = '', showToast }) => {
    const { id } = product;
    const dispatch = useDispatch()

    const myWishlist = useSelector(selectWishlist)
    const wishlistError = useSelector(selectWishlistError)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if(wishlistError) {
            showToast('error', wishlistError.message)
            dispatch(clearWishlistErrorMessage())
        }
    }, [isLoading])

    const isProductInWishlist = myWishlist?.some((wishlistItem: WishlistProduct) => wishlistItem.item.id  === id)
    
    const handleWishlistChange = () => {
        if(isProductInWishlist) {
            setIsLoading(true)
            dispatch(removeWishlistItemStart(product, setIsLoading, showToast))
        } else {
            setIsLoading(true)
            dispatch(createWishlistItemStart(product, category, setIsLoading, showToast))
        }
    }
    
    return (
        <WishlistItemButton onClick={handleWishlistChange} disabled={isLoading}>
            {   isProductInWishlist ?
                    <StyledFillHeart /> :
                    <StyledOutlineHeart />
            }
        </WishlistItemButton>
    )
}

export default WishlistButton