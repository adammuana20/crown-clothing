import SignUpForm from '../../components/sign-up-form/SignUpForm.component'
import SignIn from '../../components/sign-in/SignInForm.component'

import './Authentication.styles.scss'

const Authentication = () => {
    return (
        <div className='authentication-container'>
            <SignIn />
            <SignUpForm />
        </div>
    )
}

export default Authentication