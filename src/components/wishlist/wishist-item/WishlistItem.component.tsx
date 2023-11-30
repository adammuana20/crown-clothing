import { FC, useState } from "react"
import { useDispatch } from "react-redux"

import { WishlistProduct } from "../wishlist-button/WishlistButton.component"

import { removeWishlistItemStart } from "../../../store/wishlist/Wishlist.action"

import { WishlistItemContainer, WishlistItemLink, ImageContainer, WishlistImage, WishlistContentContainer, RemoveButton, Price } from "./WishlistItem.styles"

type WishlistItemProps = {
    wishlistItem: WishlistProduct
    showToast: (type: string, message: string) => void;
}

const WishlistItem: FC<WishlistItemProps> = ({ wishlistItem, showToast }) => {
    const dispatch = useDispatch()

    const { id, name, imageUrl, price } = wishlistItem.item
    const { category, item } = wishlistItem
    const [removeWishlistisLoading, setRemoveWishlistisLoading] = useState<boolean>(false)

    const handleRemoveWishlist = () => {
        setRemoveWishlistisLoading(true)
        dispatch(removeWishlistItemStart(item, setRemoveWishlistisLoading, showToast))
    }

    return (
        <WishlistItemContainer $isLoading={removeWishlistisLoading}>
            <WishlistItemLink to={`/shop/${category}/${id}`}>
                <ImageContainer>
                    <WishlistImage src={imageUrl} alt={name} />
                </ImageContainer>
            </WishlistItemLink>
            <WishlistContentContainer>
                <WishlistItemLink to={`/shop/${category}/${id}`}>
                    <p>{name}</p>
                </WishlistItemLink>
                <Price>${price}</Price>
                <RemoveButton onClick={handleRemoveWishlist} disabled={removeWishlistisLoading}>Remove</RemoveButton>
            </WishlistContentContainer>
        </WishlistItemContainer>
    )
}

export default WishlistItem