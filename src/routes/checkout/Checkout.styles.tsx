import styled from "styled-components";

export const CheckoutContainer = styled.div`
  min-height: 90vh;
  color: var(--color-dark);
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 1.5rem;
  }

`

export const CheckOutHeader = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  border-bottom: 1px solid darkgrey;

  @media only screen and (max-width: 800px) {
    display: none;
  }
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
  color: var(--color-dark);
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