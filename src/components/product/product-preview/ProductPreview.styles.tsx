import { Link } from "react-router-dom";
import styled from "styled-components";

export const ProductPreviewContainer = styled.div`
    margin: 20px 0 80px;
    color: var(--color-text-primary);
`

export const ImageContainer = styled.div`
    width: 600px;
    height: 600px;
`

export const ProductImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export const ProductInfo = styled.div`
    flex-basis: 60%;
    margin-left: 40px;
`

export const Price = styled.p`
    color: red;
    font-weight: bolder;
`

export const WishlistButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const ProductInputContainer = styled.div`
    padding-bottom: 2rem;
`

export const ItemPreview = styled.div`
    display: flex;
    margin-top: 3rem;
`

export const GoBackLink = styled(Link)`
    margin-left: -130px;
    text-transform: none;

    &:hover {
        font-weight: bold;
        text-decoration: underline;
        text-underline-offset: 0.2rem;
    }
`