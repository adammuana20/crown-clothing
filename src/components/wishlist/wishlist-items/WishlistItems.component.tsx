import { useSelector } from "react-redux"

import MobileBottomMenu from "../../../routes/mobile-bottom-menu/MobileBottomMenu.component"
import WishlistItem from "../wishist-item/WishlistItem.component"
import { WishlistProduct } from "../wishlist-button/WishlistButton.component"

import { selectWishlist } from "../../../store/wishlist/Wishlist.selector"

import { WishlistContainer } from "./WishlistItems.styles"

const WishlistItems = () => {
    const myWishlist = useSelector(selectWishlist)
    
    return (
        <WishlistContainer>
            { myWishlist.length === 0 ?
               <h2>No wishlist</h2> :
                <>
                    <h2>My Wishlist</h2> 
                    {
                        myWishlist.map((wishlistItem: WishlistProduct) => (
                            <WishlistItem key={wishlistItem.item.id} wishlistItem={wishlistItem} />
                        ))
                    }
                </>
            }
            <MobileBottomMenu/>
        </WishlistContainer>
    )
}

export default WishlistItems