import styled, { css } from "styled-components";

import { Link } from "react-router-dom";

type CheckOutItemProps = {
  $isUpdating: boolean;
}

export const CheckoutItemContainer = styled.div<CheckOutItemProps>`
  width: 100%;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  display: flex;

  ${({$isUpdating}) => $isUpdating && css`
    opacity: 0.6;
    pointer-events: none;
  `}
`

export const ImageContainer = styled.div`
  width: 11%;

    img {
      width: 100%;
      height: 100%;
    }
`

export const BaseSpan = styled.span`
  width: 26%;
  text-align: center;
  color: red;
  font-weight: bolder;
`

export const ProductInputContainer = styled.div`
  width: 26%;
  display: flex;
  justify-content: center;
`

export const RemoveItem = styled.div`
  width: 8%;
  cursor: pointer;
  text-align: end;
  padding-right: 2.5rem;
`

export const ProductLink = styled(Link)`
  text-transform: none;
  width: 14%;
`

export const ProductDetailsContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  ${ProductLink} {
    padding-left: 0.6rem;

    &:hover {
      font-weight: bold;
    }
  }
`