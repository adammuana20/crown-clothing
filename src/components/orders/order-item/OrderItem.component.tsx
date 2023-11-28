import { FC } from "react"

import { CartItem } from "../../../store/cart/Cart.types"

import { ItemContainer, ProductNameQtyContainer, ItemDetailsContainer, ItemLink } from "./OrderItem.styles"
import { ImageContainer } from "../../checkout-item/CheckoutItem.styles"


type OrderItemProps = {
    item: CartItem
}

const OrderItem: FC<OrderItemProps> = ({ item }) => {
    const { name, category, quantity, imageUrl, price, id } = item
    const total = price * quantity

    return (
        <ItemContainer>
            <ImageContainer>
                <ItemLink to={`/shop/${category}/${id}`}>
                    <img src={imageUrl} alt={name} />
                </ItemLink>
            </ImageContainer>
            <ItemDetailsContainer>
                <ProductNameQtyContainer>
                    <ItemLink to={`/shop/${category}/${id}`}>
                        <span>{name}</span>
                    </ItemLink>
                    <span>x{quantity}</span>
                </ProductNameQtyContainer>
                <p>${total}</p>
            </ItemDetailsContainer>
        </ItemContainer>
    )
}

export default OrderItem