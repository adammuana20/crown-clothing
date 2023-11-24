import { FC, useState } from "react"
import { useDispatch } from "react-redux"

import { WishlistProduct } from "../wishlist-button/WishlistButton.component"

import { removeWishlistItemStart } from "../../../store/wishlist/Wishlist.action"

import { WishlistItemContainer, WishlistItemLink, ImageContainer, WishlistImage, WishlistContentContainer, RemoveButton, Price } from "./WishlistItem.styles"

type WishlistItemProps = {
    wishlistItem: WishlistProduct
}

const WishlistItem: FC<WishlistItemProps> = ({ wishlistItem }) => {
    const dispatch = useDispatch()
    const { id, name, imageUrl, price } = wishlistItem.item
    const { category, item } = wishlistItem
    const [removeWishlistisLoading, setRemoveWishlistisLoading] = useState(false)
    
    const handleRemoveWishlist = async () => {
        setRemoveWishlistisLoading(true)
        dispatch(removeWishlistItemStart(item, setRemoveWishlistisLoading))
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
                <RemoveButton onClick={handleRemoveWishlist} isLoading={removeWishlistisLoading}>Remove</RemoveButton>
            </WishlistContentContainer>
        </WishlistItemContainer>
    )
}

export default WishlistItem