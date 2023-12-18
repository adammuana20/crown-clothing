import styled from "styled-components";
import Button from "../../button/Button.component";

export const SignInContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    margin: auto;
    color: var(--color-dark);

    h2 {
        margin: 10px 0;
    }

    hr {
        margin-bottom: 1rem;
    }

    &:last-child() button {
        width: 100%;
    }

    @media only screen and (max-width: 550px) {
        width: 100%;
    }
`

export const ButtonsContainer = styled.div`
    display: flex;
    margin-bottom: 1rem;
    justify-content: space-between;

    @media only screen and (max-width: 550px) {
        flex-direction: column;
        gap: .5rem;
    }
`

export const NewAccountButton = styled(Button)`
    width: 100%;
`