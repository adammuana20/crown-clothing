import styled from "styled-components";

export const CategoryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
    row-gap: 50px;
`

export const CategoryTitle = styled.h2`
    font-size: 38px;
    margin-bottom: 25px;
    text-align: center;
    color: var(--color-text-primary);
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 4rem;
`