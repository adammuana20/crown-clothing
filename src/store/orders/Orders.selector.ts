import { createSelector } from "reselect";
import { RootState } from "../Store";
import { OrderState } from "./Orders.reducer";


const selectOrdersReducer = (state: RootState): OrderState => state.orders

export const selectOrdersItem = createSelector(
    [selectOrdersReducer],
    (orders) => orders.orders
)