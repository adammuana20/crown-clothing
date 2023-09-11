import SignUpForm from '../../components/sign-up-form/SignUpForm.component'
import SignInForm from '../../components/sign-in/SignInForm.component'

import { AuthenticationContainer } from './Authentication.styles.js'

const Authentication = () => {
    return (
        <AuthenticationContainer>
            <SignInForm />
            <SignUpForm />
        </AuthenticationContainer>
    )
}

export default Authentication