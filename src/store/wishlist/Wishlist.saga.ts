import { takeLatest, put, call, all, takeEvery } from "typed-redux-saga/macro";
import { WISHLIST_ACTION_TYPES } from "./Wishlist.types";
import { CreateWishlistItemStart, FetchWishlistStart, RemoveWishlistItemStart, createWishlistItemFailed, createWishlistItemSuccess, fetchWishlistFailed, fetchWishlistStart, fetchWishlistSuccess, removeWishlistItemFailed, removeWishlistItemSuccess } from "./Wishlist.action";
import { createWishlistDocumentToUser, getWishlistAndDocuments, removeWishlistItemToUser } from "../../utils/firebase/Firebase.utils";

export function* fetchWishlistStartAsync({payload: { setWishlistIsLoading }}: FetchWishlistStart) {
    try {
        const wishlistArray = yield* call(getWishlistAndDocuments)        
        yield* put(fetchWishlistSuccess(wishlistArray))
    } catch(error) {
        yield* put(fetchWishlistFailed(error as Error))
    } finally {
        setWishlistIsLoading(false)
    }
}

export function* createWishlistItem({payload: { wishlistItem, category, setIsAddingToWishlist }}: CreateWishlistItemStart) {
    try {
        yield* call(createWishlistDocumentToUser, wishlistItem, category)
        yield* put(createWishlistItemSuccess())
        yield* put(fetchWishlistStart(setIsAddingToWishlist))
    } catch(error) {
        yield* put(createWishlistItemFailed(error as Error))
        setIsAddingToWishlist(false)
    }
}

export function* removeWishlistItem({payload: { wishlistItem, setIsRemovingToWishlist }}: RemoveWishlistItemStart) {
    try {
        yield* call(removeWishlistItemToUser, wishlistItem)
        yield* put(removeWishlistItemSuccess())
        yield* put(fetchWishlistStart(setIsRemovingToWishlist))
    } catch(error) {
        yield* put(removeWishlistItemFailed(error as Error))
        setIsRemovingToWishlist(false)
    }
}

export function* onFetchWishlist() {
    yield* takeLatest( WISHLIST_ACTION_TYPES.FETCH_WISHLIST_START, fetchWishlistStartAsync )
}

export function* onCreateWishlistItem() {
    yield* takeEvery( WISHLIST_ACTION_TYPES.CREATE_WISHLIST_ITEM_START, createWishlistItem )
}

export function* onRemoveWishlistItem() {
    yield* takeEvery( WISHLIST_ACTION_TYPES.REMOVE_WISHLIST_ITEM_START,  removeWishlistItem )
}

export function* wishlistSaga() {
    yield* all([call(onCreateWishlistItem), call(onFetchWishlist), call(onRemoveWishlistItem)])
}