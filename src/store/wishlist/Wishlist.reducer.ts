import { AnyAction } from "redux"
import { WishlistProduct } from "../../components/wishlist/wishlist-button/WishlistButton.component";
import { createWishlistItemFailed, createWishlistItemStart, createWishlistItemSuccess, fetchWishlistFailed, fetchWishlistStart, fetchWishlistSuccess, removeWishlistItemFailed } from "./Wishlist.action";

export type WishlistState = {
    readonly wishlist: WishlistProduct[];
    readonly wishlistIsLoading: boolean;
    readonly error: Error | null;
}

export const WISHLIST_INITIAL_STATE: WishlistState = {
    wishlist: [],
    wishlistIsLoading: false,
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
            wishlistIsLoading: true,
        }
    }

    if(fetchWishlistSuccess.match(action)) {
        return {
            ...state,
            wishlist: action.payload,
            wishlistIsLoading: false,
        }
    }

    if(fetchWishlistFailed.match(action)) {
        return {
            ...state,
            wishlistIsLoading: false,
            error: action.payload,
        }
    }

    return state
}