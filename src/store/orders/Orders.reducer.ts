import { AnyAction } from "redux";
import { clearOrdersErrorMessage, createOrderFailed, createOrderStart, createOrderSuccess, fetchOrdersFailed, fetchOrdersStart, fetchOrdersSuccess } from "./Orders.action";
import { Order } from "./Orders.types";


export type OrderState = {
    readonly orders: Order[];
    readonly creatingNewOrder: boolean;
    readonly fetchingOrders: boolean;
    readonly error: Error | null;
}

export const ORDER_INITIAL_STATE: OrderState = {
    orders: [],
    creatingNewOrder: false,
    fetchingOrders: false,
    error: null,
}

export const orderReducer = (state = ORDER_INITIAL_STATE, action: AnyAction): OrderState => {

    if(createOrderStart.match(action)) {
        return {
            ...state,
            creatingNewOrder: true,
        }
    }

    if(createOrderSuccess.match(action)) {
        return {
            ...state,
            creatingNewOrder: false,
        }
    }

    if(createOrderFailed.match(action)) {
        return {
            ...state,
            creatingNewOrder: false,
            error: action.payload
        }
    }

    if(fetchOrdersStart.match(action)) {
        return {
            ...state,
            fetchingOrders: true,
        }
    }

    if(fetchOrdersSuccess.match(action)) {
        return {
            ...state,
            fetchingOrders: false,
            orders: action.payload,
        }
    }

    if(fetchOrdersFailed.match(action)) {
        return {
            ...state,
            fetchingOrders: false,
            error: action.payload,
        }
    }

    if(clearOrdersErrorMessage.match(action)) {
        return {
            ...state,
            error: null,
        }
    }

    return state
}