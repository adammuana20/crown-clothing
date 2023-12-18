import styled from "styled-components";
import Button from "../../button/Button.component";

export const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    margin: auto;
    color: var(--color-dark);

    h2 {
        margin: 10px 0;
    }

    @media only screen and (max-width: 550px) {
        width: 100%;
        justify-content: center;
    }
`

export const BtnContainer = styled.div`
    display: flex;
    justify-content: center;
`

export const SignUpBtn = styled(Button)`
    @media only screen and (max-width: 550px) {
        width: 100%;
    }
`