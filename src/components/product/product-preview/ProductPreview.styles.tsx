import { Link } from "react-router-dom";
import styled from "styled-components";

export const ProductPreviewContainer = styled.div`
    margin: 0 0 5rem;
    color: var(--color-text-primary);

    text-align: start;
`

export const ImageContainer = styled.div`
    width: 600px;
    height: 600px;

    @media only screen and (max-width: 800px) {
        width: 100%;
    }

    @media only screen and (max-width: 700px) {
        height: 550px;
    }

    @media only screen and (max-width: 600px) {
        height: 100%;
    }
`

export const ProductImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

export const ProductInfo = styled.div`
    flex-basis: 60%;
    margin-left: 40px;

    @media only screen and (max-width: 800px) {
        margin-left: 0;
        padding-inline: 1rem;
        padding-top: 1rem;
    }

`

export const Price = styled.p`
    color: red;
    font-weight: bolder;
    font-size: 1.3rem;
    padding-block: 1rem;
`

export const WishlistButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
        margin-block: .5rem;
        font-weight: bolder;
    }
`

export const QtyBtnContainer = styled.div`
    display: flex;
    gap: 2rem;
    padding-top: 1rem;
`

export const GoBackLink = styled(Link)`
    padding-left: 3rem;
    text-transform: none;

    &:hover {
        font-weight: bold;
        text-decoration: underline;
        text-underline-offset: 0.2rem;
    }

    @media only screen and (max-width: 800px) {
        padding-left: 1rem;
    }
`

export const ItemPreview = styled.div`
    display: flex;
    margin-top: 3rem;

    @media only screen and (max-width: 800px) {
        flex-direction: column;
        text-align: start;
        margin-top: 1rem;
    }
`