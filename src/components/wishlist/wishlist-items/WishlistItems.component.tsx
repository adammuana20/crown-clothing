import { useSelector } from "react-redux"

import MobileBottomMenu from "../../../routes/mobile-bottom-menu/MobileBottomMenu.component"

import { selectWishlist } from "../../../store/wishlist/Wishlist.selector"
import { WishlistProduct } from "../wishlist-button/WishlistButton.component"

import WishlistItem from "../wishist-item/WishlistItem.component"



const WishlistItems = () => {
    const myWishlist = useSelector(selectWishlist)    
    
    return (
        <>
            { myWishlist.length === 0 ?
               <h2>No wishlist</h2> :
                <>
                    <h2>My Wishlist</h2> 
                    {
                        myWishlist.map((wishlistItem: WishlistProduct) => (
                            <WishlistItem key={wishlistItem.item.id} wishlistItem={wishlistItem}/>
                        ))
                    }
                </>
            }
            <MobileBottomMenu/>
        </>
    )
}

export default WishlistItems