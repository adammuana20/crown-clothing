import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import MobileBottomMenu from "../../../routes/mobile-bottom-menu/MobileBottomMenu.component"
import WishlistItem from "../wishist-item/WishlistItem.component"
import PopUp from "../../ui/popup/PopUp.component"
import { WishlistProduct } from "../wishlist-button/WishlistButton.component"

import { selectWishlistError } from "../../../store/wishlist/Wishlist.selector"
import { clearWishlistErrorMessage } from "../../../store/wishlist/Wishlist.action"

import { usePopup } from "../../../hooks/usePopup.hooks"

import { selectWishlist } from "../../../store/wishlist/Wishlist.selector"



const WishlistItems = () => {
    const { showToast, handleClose, toasts } = usePopup()
    const dispatch = useDispatch()
    const myWishlist = useSelector(selectWishlist)
    const wishlistError = useSelector(selectWishlistError)

    useEffect(() => {
        if(wishlistError) {
            showToast('error', wishlistError.message)
            dispatch(clearWishlistErrorMessage())
        }
    }, [wishlistError])
    
    return (
        <>
            { myWishlist.length === 0 ?
               <h2>No wishlist</h2> :
                <>
                    <h2>My Wishlist</h2> 
                    {
                        myWishlist.map((wishlistItem: WishlistProduct) => (
                            <WishlistItem key={wishlistItem.item.id} wishlistItem={wishlistItem} showToast={showToast} />
                        ))
                    }
                </>
            }
            <PopUp handleClose={handleClose} toasts={toasts} />
            <MobileBottomMenu/>
        </>
    )
}

export default WishlistItems