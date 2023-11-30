import { WISHLIST_ACTION_TYPES } from "./Wishlist.types";

import { ActionWithPayload, createAction, withMatcher, Action } from "../../utils/reducer/Reducer.utils";

import { CategoryItem } from "../categories/Category.types";
import { WishlistProduct } from "../../components/wishlist/wishlist-button/WishlistButton.component";

export type CreateWishlistItemStart = ActionWithPayload<WISHLIST_ACTION_TYPES.CREATE_WISHLIST_ITEM_START, { wishlistItem: CategoryItem, category: string, setIsAddingToWishlist: React.Dispatch<React.SetStateAction<boolean>>, showToast: Function}>
export type CreateWishlistItemSucces = Action<WISHLIST_ACTION_TYPES.CREATE_WISHLIST_ITEM_SUCCESS>
export type CreateWishlistItemFailed = ActionWithPayload<WISHLIST_ACTION_TYPES.CREATE_WISHLIST_ITEM_FAILED, Error>
export type FetchWishlistStart = Action<WISHLIST_ACTION_TYPES.FETCH_WISHLIST_START>
export type FetchWishlistSucces = ActionWithPayload<WISHLIST_ACTION_TYPES.FETCH_WISHLIST_SUCCESS, WishlistProduct[]>
export type FetchWishlistFailed = ActionWithPayload<WISHLIST_ACTION_TYPES.CREATE_WISHLIST_ITEM_FAILED, Error>
export type RemoveWishlistItemStart = ActionWithPayload<WISHLIST_ACTION_TYPES.REMOVE_WISHLIST_ITEM_START, { wishlistItem: CategoryItem, setIsRemovingToWishlist: React.Dispatch<React.SetStateAction<boolean>>, showToast: Function }>
export type RemoveWishlistItemSuccess = Action<WISHLIST_ACTION_TYPES.REMOVE_WISHLIST_ITEM_SUCCESS>
export type RemoveWishlistItemFailed = ActionWithPayload<WISHLIST_ACTION_TYPES.REMOVE_WISHLIST_ITEM_FAILED, Error>
export type ClearWishlistErrorMessage = Action<WISHLIST_ACTION_TYPES.CLEAR_WISHLIST_ERROR_MESSAGE>

export const createWishlistItemStart = withMatcher((wishlistItem: CategoryItem, category: string, setIsAddingToWishlist: React.Dispatch<React.SetStateAction<boolean>>, showToast: Function): CreateWishlistItemStart => createAction(WISHLIST_ACTION_TYPES.CREATE_WISHLIST_ITEM_START, { wishlistItem, category, setIsAddingToWishlist, showToast }))
export const createWishlistItemSuccess = withMatcher((): CreateWishlistItemSucces => createAction(WISHLIST_ACTION_TYPES.CREATE_WISHLIST_ITEM_SUCCESS))
export const createWishlistItemFailed = withMatcher((error: Error): CreateWishlistItemFailed  => createAction(WISHLIST_ACTION_TYPES.CREATE_WISHLIST_ITEM_FAILED, error))
export const fetchWishlistStart = withMatcher((): FetchWishlistStart => createAction(WISHLIST_ACTION_TYPES.FETCH_WISHLIST_START))
export const fetchWishlistSuccess = withMatcher((wishlistArray: WishlistProduct[]): FetchWishlistSucces => createAction(WISHLIST_ACTION_TYPES.FETCH_WISHLIST_SUCCESS, wishlistArray))
export const fetchWishlistFailed = withMatcher((error: Error): FetchWishlistFailed  => createAction(WISHLIST_ACTION_TYPES.CREATE_WISHLIST_ITEM_FAILED, error))
export const removeWishlistItemStart = withMatcher((wishlistItem: CategoryItem, setIsRemovingToWishlist: React.Dispatch<React.SetStateAction<boolean>>, showToast: Function): RemoveWishlistItemStart => createAction(WISHLIST_ACTION_TYPES.REMOVE_WISHLIST_ITEM_START, { wishlistItem, setIsRemovingToWishlist, showToast }))
export const removeWishlistItemSuccess = withMatcher((): RemoveWishlistItemSuccess => createAction(WISHLIST_ACTION_TYPES.REMOVE_WISHLIST_ITEM_SUCCESS))
export const removeWishlistItemFailed = withMatcher((error: Error): RemoveWishlistItemFailed => createAction(WISHLIST_ACTION_TYPES.REMOVE_WISHLIST_ITEM_FAILED, error))
export const clearWishlistErrorMessage = withMatcher((): ClearWishlistErrorMessage => createAction(WISHLIST_ACTION_TYPES.CLEAR_WISHLIST_ERROR_MESSAGE))