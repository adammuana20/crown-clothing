import styled from "styled-components";

export const CheckoutContainer = styled.div`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 0 30px;
`

export const CheckOutHeader = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  border-bottom: 1px solid darkgrey;
`

export const HeaderBlock = styled.div`
  text-transform: capitalize;
  width: 23%;
  display: flex;
  justify-content: center;

  &:first-child {
    justify-content: start;
  }

  &:last-child {
    width: 8%;
  }
`

export const Total = styled.span`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`

export const CheckoutEmptyMessage = styled.span`
  font-size: 30px;
  margin: 50px auto;
`

export const GoBackToShop = styled.span`
  cursor: pointer;
  color: blue;

  &:hover{
    font-weight: bold;
    text-decoration: underline;
  }
`