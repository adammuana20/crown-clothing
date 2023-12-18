import styled from "styled-components";

export const RelatedProductsWrapper = styled.div`
    color: var(--color-text-primary);

    h2 {
        margin-bottom: 1.5rem;
    }

    @media only screen and (max-width: 800px) {
        text-align: center;
    }
`

export const RelatedProductsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(18rem,1fr));
    column-gap: 20px;
    row-gap: 50px;

    @media only screen and (max-width: 800px) {
        grid-template-columns: 1fr 1fr;
    }
`