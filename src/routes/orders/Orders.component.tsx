import { useSelector } from "react-redux"

import { selectOrdersItem } from "../../store/orders/Orders.selector"

import OrderItems from "../../components/orders/order-items/OrderItems.component"
import { OrdersContainer } from "./Orders.styles"


const Orders = () => {
    const myOrders = useSelector(selectOrdersItem)

    return (
        <OrdersContainer>
            { myOrders.length === 0 ?
                <h2>No Orders</h2> :
                <>
                    <h2>My Orders</h2>
                    {
                        myOrders.map((orders) => (
                            <OrderItems key={orders.id} myOrders={orders}/>
                        ))
                    }
                </>

            }
        </OrdersContainer>
    )
}

export default Orders