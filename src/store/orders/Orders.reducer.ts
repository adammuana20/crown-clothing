import { AnyAction } from "redux";
import { createOrderFailed, createOrderStart, createOrderSuccess } from "./Orders.action";
import { Order } from "./Orders.types";


export type OrderState = {
    readonly orders: Order[];
    readonly creatingNewOrder: boolean;
    readonly error: Error | null;
}

export const ORDER_INITIAL_STATE: OrderState = {
    orders: [],
    creatingNewOrder: false,
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
        }
    }

    return state
}