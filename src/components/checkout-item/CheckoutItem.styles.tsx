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
  text-align: start;

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

  @media only screen and (max-width: 800px) {
    width: unset;

    img {
      width: 250px;
      height: 250px;
    }
  }

  @media only screen and (max-width: 550px) {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }
`

export const BaseSpan = styled.span`
  width: 26%;
  text-align: center;
  color: red;
  font-weight: bolder;

  @media only screen and (max-width: 800px) {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 3rem;
    gap: .5rem;
  }

  @media only screen and (max-width: 550px) {
    padding-right: 0;
    justify-content: flex-start;
  }
`

export const ProductInputContainer = styled.div`
  width: 26%;
  display: flex;
  justify-content: center;
  height: 2.5rem;

  @media only screen and (max-width: 800px) {
    width: 100%;
    justify-content: flex-start;
  }
`

export const RemoveItem = styled.div`
  width: 8%;
  cursor: pointer;
  text-align: end;
  padding-right: 1rem;

  @media only screen and (max-width: 800px) {
    width: 100%;
    text-align: end;
    padding-right: 3rem;
  }

  @media only screen and (max-width: 550px) {
    text-align: start;
    padding-right: 0;
  }
`

export const ProductLink = styled(Link)`
  text-transform: none;
  width: 14%;

  @media only screen and (max-width: 800px) {
    width: 100%;
    text-align: start;
  }
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

  @media only screen and (max-width: 800px) {
    flex-direction: column;
    align-items: start;
    padding-left: 1.5rem;
    gap: .5rem;

    ${ProductLink} {
      padding-left: 0;
    }
  }
`

export const SpanTitle = styled.span`
  display: none;

  @media only screen and (max-width: 800px) {
    display: block;
    color: var(--color-dark);
  }
`