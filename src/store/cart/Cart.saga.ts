import { takeEvery, all, call, put, takeLatest, delay } from "typed-redux-saga"
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
import { createCartDocumentToUser, updateQtyItemToCartFromUserDocument, getCartItemsAndDocuments, removeItemFromCartOfUser } from "../../utils/firebase/Firebase.utils"


export function* fetchCartItemsStartAsync() {
    try {
        const productArray = yield* call(getCartItemsAndDocuments)
        
        if(productArray) {
            yield* put(fetchCartItemsSuccess(productArray))
        }
        
    } catch(err) {
        yield* put(fetchCartItemsFailed(err as Error))
    }
}

export function* setCartItems({payload: { product, qty, category }}: SetCartItemsStart) {
    try {
        yield* call(createCartDocumentToUser, product, qty, category)
        yield* put(addItemsToCartSuccess())
        yield* put(fetchCartItemsStart())
    } catch(error) {
        yield* put(addItemsToCartFailed(error as Error))
    }
}

export function* updateItemFromCart({payload: { productID, qty, setIsUpdating }}: UpdateQtyItemFromCartStart) {
    try {
        yield* call(updateQtyItemToCartFromUserDocument, productID, qty)
        yield* put(updateQtyItemFromCartSuccess())
        yield* put(fetchCartItemsStart())
    } catch(error) {
        yield* put(updateQtyItemFromCartFailed(error as Error))
    } finally {
        yield* call(setIsUpdating, false)
    }
}

export function* removeItemFromCart({payload: { productID }}: RemoveItemFromCartStart) {
    try {
        yield* call(removeItemFromCartOfUser, productID)
        yield* put(removeItemFromCartSuccess())
        yield* put(fetchCartItemsStart())
    } catch(error) {
        yield* put(removeItemFromCartFailed(error as Error))
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