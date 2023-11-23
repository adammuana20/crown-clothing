import styled from "styled-components";

import { ReactComponent as ShoppingSVG } from '../../../assets/shopping-cart-icon.svg'

export const ShoppingIcon = styled(ShoppingSVG)`
  width: 27px;
  height: 27px;
  cursor: pointer;
`

export const CartIconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 800px) {
    display: none;
  }
`

export const ItemCount = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  font-size: .8rem;
  font-weight: bold;
  bottom: 26px;
  right: -6px;
  background-color: #d82c23;
  color: #fff;
`