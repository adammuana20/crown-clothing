import styled from "styled-components";

export const OrdersContainer = styled.div`
    margin-bottom: 2rem;
`

export const OrderTotalContainer = styled.div`
    text-align: end;
    padding: 2rem 1rem;
    border-bottom: 1px solid #d5d5d5;
`

export const OrderTotalText = styled.span`
    
`

export const OrderTotal = styled.span`
    color: red;
    font-weight: bolder;
`

export const DateIDContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 1rem;
    text-align: start;

    @media only screen and (max-width: 650px) {
        flex-direction: column;
        gap: .5rem;
    }
`

export const OrderID = styled.span`
    font-weight: bold;
`