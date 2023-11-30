import { createSelector } from "reselect";

import { RootState } from "../Store";

import { WishlistState } from "./Wishlist.reducer";

const selectWishlistReducer = (state: RootState): WishlistState => state.wishlist

export const selectWishlist = createSelector(
    [selectWishlistReducer],
    (wishlistSlice) => wishlistSlice.wishlist
)

export const selectWishlistIsLoading = createSelector(
    [selectWishlistReducer],
    (wishlistSlice) => wishlistSlice.wishlistIsFetching
)

export const selectWishlistError = createSelector(
    [selectWishlistReducer],
    (wishlistSlice) => wishlistSlice.error
)