import styled from "styled-components";

export const MobileMenuContainer = styled.div`
    display: none;

    @media only screen and (max-width: 800px) {
        display: flex;
    }
`

export const MobileButton = styled.button`
    background-color: transparent;
    border: none;
    font-size: 1.8rem;
    height: 30px;
    color: var(--color-dark);
`