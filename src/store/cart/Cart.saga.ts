import { takeEvery, all, call, put, takeLatest, delay } from "typed-redux-saga/macro"
import { CART_ACTION_TYPES } from "./Cart.types"
import { 
    UpdateQtyItemFromCartStart, 
    SetCartItemsStart, 
    addItemsToCartFailed, 
    addItemsToCartSuccess, 
    fetchCartItemsFailed, 
    fetchCartItemsSuccess, 
    updateQtyItemFromCartFailed, 
    updateQtyItemFromCartSuccess, 
    fetchCartItemsStart, 
    removeItemFromCartFailed, 
    RemoveItemFromCartStart,
    removeItemFromCartSuccess,
} from "./Cart.action"
import { createCartDocumentOfUser, updateQtyItemToCartFromUserDocument, getCartItemsAndDocuments, removeItemFromCartOfUser } from "../../utils/firebase/Firebase.utils"


export function* fetchCartItemsStartAsync() {
    try {
        const productArray = yield* call(getCartItemsAndDocuments)
        
        if(productArray) {
            yield* put(fetchCartItemsSuccess(productArray))
        }
    } catch(error) {
        yield* put(fetchCartItemsFailed(error as Error))
    }
}

export function* setCartItems({payload: { product, qty, category, showToast }}: SetCartItemsStart) {
    try {
        yield* call(createCartDocumentOfUser, product, qty, category)
        yield* put(addItemsToCartSuccess())
        yield* put(fetchCartItemsStart())
        showToast('success', 'Added to cart!')
    } catch(error) {
        yield* put(addItemsToCartFailed(error as Error))
    }
}

export function* updateItemFromCart({payload: { productID, qty, setIsUpdating, showToast }}: UpdateQtyItemFromCartStart) {
    try {
        yield* call(updateQtyItemToCartFromUserDocument, productID, qty)
        yield* put(updateQtyItemFromCartSuccess())
        yield* put(fetchCartItemsStart())
        showToast('success', 'Quantity Updated!')
    } catch(error) {
        yield* put(updateQtyItemFromCartFailed(error as Error))
    } finally {
        yield* call(setIsUpdating, false)
    }
}

export function* removeItemFromCart({payload: { productID, showToast, setIsUpdating }}: RemoveItemFromCartStart) {
    try {
        yield* call(removeItemFromCartOfUser, productID)
        yield* put(removeItemFromCartSuccess())
        yield* put(fetchCartItemsStart())
        showToast('success', 'Item Removed From Cart!')
    } catch(error) {
        yield* put(removeItemFromCartFailed(error as Error))
    } finally {
        yield* call(setIsUpdating, false)
    }
}

export function* onFetchCartItems() {
    yield* takeLatest( CART_ACTION_TYPES.FETCH_CART_ITEMS_START, fetchCartItemsStartAsync )
}

export function* onSetCartItems() {
    yield* takeEvery( CART_ACTION_TYPES.ADD_ITEMS_TO_CART_START, setCartItems )
}

export function* onUpdateItemFromCart() {
    yield* takeEvery( CART_ACTION_TYPES.UPDATE_QTY_ITEM_FROM_CART_START,  updateItemFromCart)
}

export function* onRemoveItemFromCart() {
    yield* takeEvery( CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART_START, removeItemFromCart )
}

export function* CartSaga() {
    yield* all([call(onSetCartItems), call(onFetchCartItems), call(onUpdateItemFromCart), call(onRemoveItemFromCart)])
}