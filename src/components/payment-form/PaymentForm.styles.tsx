import styled from "styled-components";
import Button from '../button/Button.component'

export const PaymentFormContainer = styled.div`
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
        margin-bottom: 1.5rem;
    }

    @media only screen and (max-width: 800px) {
        width: 100%;
    }
`

export const FormContainer = styled.form`
    height: 100px;
    min-width: 500px;

    @media only screen and (max-width: 800px) {
        width: 100%;
        min-width: unset;
    }
`

export const PaymentButton = styled(Button)`
    margin-left: auto;
    margin-top: 30px;
`