import styled from "styled-components";

export const FooterContainer = styled.footer`
    background-color: black;
    color: #fff;
    padding: 2.5rem 6.5rem;

    @media only screen and (max-width: 800px) {
        display: none;
    }
`

export const FooterContent = styled.div`
    max-width: 1250px;
    text-align: center;
    margin: 0 auto;
`