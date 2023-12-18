import styled from "styled-components";
import { Link } from "react-router-dom";

import { ProductDetailsContainer } from "../../checkout-item/CheckoutItem.styles";

export const ItemContainer = styled.div`
    display: flex;
    padding: 15px 0;
`

export const ItemLink = styled(Link)`
    text-transform: none;

    &:hover {
        font-weight: bold;
    }
`

export const ItemDetailsContainer = styled(ProductDetailsContainer)`
    justify-content: space-between;
    padding: 0 15px;
`

export const Price = styled.p`
    font-weight: bolder;
    color: red;
`

export const ProductNameQtyContainer = styled.div`
    display: flex;
    flex-direction: column;
`