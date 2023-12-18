import styled from "styled-components";

export const ProductInputQuantityContainer = styled.div`
    display: flex;
    border: 1px solid var(--background-light);

    input {
        border: none;
        width: 3.8rem;
        text-align: center;
        font-size: 1.1rem;
        z-index: 1;
    }
`

export const ButtonContainer = styled.div`
    background-color: var(--background-light);
    width: 2.6rem;
    height: 100%;
    font-size: 1.3rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`