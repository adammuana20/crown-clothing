import { useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { createWishlistItemStart, removeWishlistItemStart } from "../../../store/wishlist/Wishlist.action";
import { selectWishlist } from "../../../store/wishlist/Wishlist.selector";

import { CategoryItem } from "../../../store/categories/Category.types";

import { WishlistItemButton, StyledOutlineHeart, StyledFillHeart } from "./WishlistButton.styles";
import { useToast } from "../../../contexts/Toast.context";
import { selectCurrentUser } from "../../../store/user/User.selector";


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
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { showToast } = useToast()
    const currentUser = useSelector(selectCurrentUser)

    const myWishlist = useSelector(selectWishlist)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const isProductInWishlist = myWishlist?.some((wishlistItem: WishlistProduct) => wishlistItem.item.id  === id)
    
    const handleWishlistChange = () => {
        if(!currentUser) {
            navigate('/sign-in')
            showToast('error', 'You must login first!')
            return
        }

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