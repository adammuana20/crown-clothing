import { useState, MouseEvent, FC } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createWishlistItemStart, removeWishlistItemStart } from "../../../store/wishlist/Wishlist.action";
import { selectWishlist } from "../../../store/wishlist/Wishlist.selector";

import { CategoryItem } from "../../../store/categories/Category.types";

import { WishlistItemButton, StyledOutlineHeart, StyledFillHeart } from "./WishlistButton.styles";

type WishlistButtonProps = {
    product: CategoryItem;
    category?: string;
}

export type WishlistProduct = {
    item: CategoryItem;
    createdAt: Date;
    category: string;
}

const WishlistButton: FC<WishlistButtonProps> = ({ product, category = '' }) => {
    const { id } = product;
    const dispatch = useDispatch()
    const myWishlist = useSelector(selectWishlist)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const isProductInWishlist = myWishlist?.some((wishlistItem: WishlistProduct) => wishlistItem.item.id  === id)
    
    const handleWishlistChange = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if(isProductInWishlist) {
            setIsLoading(true)
            dispatch(removeWishlistItemStart(product, setIsLoading))
        } else {
            setIsLoading(true)
            dispatch(createWishlistItemStart(product, category, setIsLoading))
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