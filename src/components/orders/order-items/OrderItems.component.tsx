import { FC } from "react"

import { Order } from "../../../store/orders/Orders.types"

import { OrdersContainer, OrderTotal, OrderTotalContainer, OrderTotalText, DateIDContainer, OrderID } from "./OrderItems.styles"
import OrderItem from "../order-item/OrderItem.component"

type OrderItemsProps = {
    myOrders: Order
}

const OrderItems: FC<OrderItemsProps> = ({ myOrders }) => {
    const { total, createdAt, id } = myOrders

    //CONVERT TIMESTAMP TO JAVASCRIPT DATE
    const jsDate = new Date(createdAt.seconds * 1000 + createdAt.nanoseconds/1000000)

    //CONVERT DATE TO STRING
    const orderDate = jsDate.toLocaleDateString()

    return (
        <OrdersContainer>
            <DateIDContainer>
                <span>Date Ordered: {orderDate}</span>
                <span>Order ID: <OrderID>{id}</OrderID></span>
            </DateIDContainer>
            { myOrders.items.map((item) => (
                    <OrderItem item={item} key={item.id}/>
                ))
            }
            <OrderTotalContainer>
                <OrderTotalText>Order Total: </OrderTotalText>
                <OrderTotal>${total}</OrderTotal>
            </OrderTotalContainer>
        </OrdersContainer>
    )
}

export default OrderItems