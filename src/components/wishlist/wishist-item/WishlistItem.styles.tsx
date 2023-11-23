import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

import Button from "../../button/Button.component";

type WishlistItemContainerProps = {
    isLoading: boolean;
  }

export const WishlistItemContainer = styled.div<WishlistItemContainerProps>`
    display: flex;
    padding: 20px 10px;

    &:not(:last-child) {
        border-bottom: 1px solid #efefef;
    }

    ${({isLoading}) => css`
        background-color: black;
    `}
`

export const WishlistItemLink = styled(Link)`
    text-transform: none;
    font-weight: 400;
`

export const ImageContainer = styled.div`
    width: 200px;
    height: 200px;
`

export const WishlistImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export const Price = styled.p`
    font-size: 1.2rem;
    font-weight: 700;
    margin: 20px 0 40px;
`

export const WishlistContentContainer = styled.div`
    padding-left: 20px;
`

export const RemoveButton = styled(Button)`
    text-transform: none;
`