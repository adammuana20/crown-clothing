import styled from "styled-components";
import Button from "../../button/Button.component";

export const SignInContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    margin: auto;

    h2 {
        margin: 10px 0;
    }

    hr {
        margin-bottom: 1rem;
    }

    &:last-child() button {
        width: 100%;
    }
`

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
`

export const NewAccountButton = styled(Button)`
    width: 100%;
`