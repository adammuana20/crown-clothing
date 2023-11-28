import { Action, ActionWithPayload, createAction, withMatcher } from "../../utils/reducer/Reducer.utils";
import { CartItem } from "../cart/Cart.types";
import { ORDER_ACTION_TYPES, Order } from "./Orders.types";


export type CreateOrderStart = ActionWithPayload< ORDER_ACTION_TYPES.CREATE_ORDER_START, { paymentMethod: string, cartItems: CartItem[], amount: number } >
export type CreateOrderSuccess = Action< ORDER_ACTION_TYPES.CREATE_ORDER_SUCCESS >
export type CreateOrderFailed = ActionWithPayload< ORDER_ACTION_TYPES.CREATE_ORDER_FAILED, Error >

export type FetchOrdersStart = Action< ORDER_ACTION_TYPES.FETCH_ORDERS_START >
export type FetchOrdersSuccess = ActionWithPayload< ORDER_ACTION_TYPES.FETCH_ORDERS_SUCCESS, Order[] >
export type FetchOrdersFailed = ActionWithPayload< ORDER_ACTION_TYPES.FETCH_ORDERS_FAILED, Error >


export const createOrderStart = withMatcher((paymentMethod: string, cartItems: CartItem[], amount: number): CreateOrderStart => createAction(ORDER_ACTION_TYPES.CREATE_ORDER_START, { paymentMethod, cartItems, amount }))
export const createOrderSuccess = withMatcher((): CreateOrderSuccess => createAction(ORDER_ACTION_TYPES.CREATE_ORDER_SUCCESS))
export const createOrderFailed = withMatcher((error: Error): CreateOrderFailed => createAction(ORDER_ACTION_TYPES.CREATE_ORDER_FAILED, error))

export const fetchOrdersStart = withMatcher((): FetchOrdersStart => createAction(ORDER_ACTION_TYPES.FETCH_ORDERS_START))
export const fetchOrdersSuccess = withMatcher((ordersArray: Order[]): FetchOrdersSuccess => createAction(ORDER_ACTION_TYPES.FETCH_ORDERS_SUCCESS, ordersArray))
export const fetchOrdersFailed = withMatcher((error: Error): FetchOrdersFailed => createAction(ORDER_ACTION_TYPES.FETCH_ORDERS_FAILED, error))