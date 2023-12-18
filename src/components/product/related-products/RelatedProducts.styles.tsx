import styled from "styled-components";

export const RelatedProductsWrapper = styled.div`
    color: var(--color-text-primary);
`

export const RelatedProductsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
    row-gap: 50px;
`