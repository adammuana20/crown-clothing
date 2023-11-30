import { AnyAction } from "redux"
import { WishlistProduct } from "../../components/wishlist/wishlist-button/WishlistButton.component";
import { clearWishlistErrorMessage, createWishlistItemFailed, fetchWishlistFailed, fetchWishlistStart, fetchWishlistSuccess, removeWishlistItemFailed } from "./Wishlist.action";

export type WishlistState = {
    readonly wishlist: WishlistProduct[];
    readonly wishlistIsFetching: boolean;
    readonly error: Error | null;
}

export const WISHLIST_INITIAL_STATE: WishlistState = {
    wishlist: [],
    wishlistIsFetching: false,
    error: null,
}

export const wishlistReducer = (state = WISHLIST_INITIAL_STATE, action: AnyAction): WishlistState => {

    if(createWishlistItemFailed.match(action)) {
        return {
            ...state,
            error: action.payload,
        }
    }

    if(removeWishlistItemFailed.match(action)) {
        return {
            ...state,
            error: action.payload,
        }
    }

    if(fetchWishlistStart.match(action)) {
        return {
            ...state,
            wishlistIsFetching: true,
        }
    }

    if(fetchWishlistSuccess.match(action)) {
        return {
            ...state,
            wishlist: action.payload,
            wishlistIsFetching: false,
        }
    }

    if(fetchWishlistFailed.match(action)) {
        return {
            ...state,
            wishlistIsFetching: false,
            error: action.payload,
        }
    }

    if(clearWishlistErrorMessage.match(action)) {
        return {
            ...state,
            error: null,
        }
    }

    return state
}