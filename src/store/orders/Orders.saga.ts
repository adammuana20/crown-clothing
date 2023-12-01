import { all, call, put, takeLatest } from "typed-redux-saga/macro"
import { ORDER_ACTION_TYPES } from "./Orders.types"
import { CreateOrderStart, createOrderFailed, createOrderSuccess, fetchOrdersFailed, fetchOrdersStart, fetchOrdersSuccess } from "./Orders.action"
import { clearCartItemsOfUserAfterOrder, createOrderDocumentOfUser, getOrdersAndDocuments } from "../../utils/firebase/Firebase.utils"
import { fetchCartItemsStart } from "../cart/Cart.action"

export function* createOrder({payload: { paymentMethod, cartItems, amount, showToast, navigate }}: CreateOrderStart) {
    try {
        yield* call(createOrderDocumentOfUser, paymentMethod, cartItems, amount)
        yield* call(clearCartItemsOfUserAfterOrder)
        yield* put(createOrderSuccess())
        yield* put(fetchCartItemsStart())
        yield* put(fetchOrdersStart())
        navigate('/orders')
        showToast('success', 'Payment Successful!')
    } catch(error) {
        yield* put(createOrderFailed(error as Error))
    }
}

export function* fetchOrders() {
    try {
        const ordersArray = yield* call(getOrdersAndDocuments)
        
        if(ordersArray) {
            yield* put(fetchOrdersSuccess(ordersArray))
        }
    } catch(error) {
        yield* put(fetchOrdersFailed(error as Error))
    }
}

export function* onCreateOrder() {
    yield* takeLatest(ORDER_ACTION_TYPES.CREATE_ORDER_START, createOrder)
}

export function* onFetchOrders() {
    yield* takeLatest(ORDER_ACTION_TYPES.FETCH_ORDERS_START, fetchOrders)
}

export function* OrderSaga() {
    yield* all([call(onCreateOrder), call(onFetchOrders),])
}