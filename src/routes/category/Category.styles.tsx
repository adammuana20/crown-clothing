import styled from "styled-components";

export const CategoryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(18rem,1fr));
    column-gap: 20px;
    row-gap: 50px;

    @media only screen and (max-width: 800px) {
        grid-template-columns: 1fr 1fr;
    }
`

export const CategoryTitle = styled.h2`
    font-size: 38px;
    margin-bottom: 2rem;
    text-align: center;
    color: var(--color-text-primary);
`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 4rem;
`