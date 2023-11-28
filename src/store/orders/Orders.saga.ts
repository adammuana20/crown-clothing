import { takeEvery, all, call, put, takeLatest, delay } from "typed-redux-saga/macro"
import { ORDER_ACTION_TYPES } from "./Orders.types"
import { CreateOrderStart, createOrderFailed, createOrderSuccess } from "./Orders.action"
import { clearCartItemsOfUserAfterOrder, createOrderDocumentOfUser } from "../../utils/firebase/Firebase.utils"
import { fetchCartItemsStart } from "../cart/Cart.action"

export function* createOrder({payload: { paymentMethod, cartItems, amount }}: CreateOrderStart) {
    try{
        yield* call(createOrderDocumentOfUser, paymentMethod, cartItems, amount)
        yield* call(clearCartItemsOfUserAfterOrder)
        yield* put(createOrderSuccess())
        yield* put(fetchCartItemsStart())
    } catch(error) {
        yield* put(createOrderFailed(error as Error))
    }
}

export function* onCreateOrder() {
    yield* takeLatest(ORDER_ACTION_TYPES.CREATE_ORDER_START, createOrder)
}

export function* OrderSaga() {
    yield* all([call(onCreateOrder), ])
}