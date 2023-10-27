import { useState, FormEvent, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Button, { BUTTON_TYPE_CLASSES } from '../../button/Button.component'
import FormInput from '../../form-input/FormInput.component'

import { googleSignInStart, emailSignInStart } from '../../../store/user/User.action'
import { selectEmailSignInIsLoading, selectGoogleSignInIsLoading, selectEmailSignInButton, selectGoogleSignInButton, selectUserError } from '../../../store/user/User.selector'

import { SignInContainer, ButtonsContainer } from './SignInForm.styles'
import { alreadyLoggedIn } from '../../../utils/loaders/Loaders.utils'


export async function loader(currentUser: Object) {
    return await alreadyLoggedIn(currentUser)
}

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [signInForm, setSignInForm] = useState(defaultFormFields)
    const { email, password } = signInForm
    const emailSignInIsLoading = useSelector(selectEmailSignInIsLoading)
    const googleSignInIsLoading = useSelector(selectGoogleSignInIsLoading)
    const emailSignInButton = useSelector(selectEmailSignInButton)
    const googleSignInButton = useSelector(selectGoogleSignInButton)
    const error = useSelector(selectUserError)
    const navigate = useNavigate()   

    const dispatch = useDispatch()

    const resetFormFields = () => {
        setSignInForm(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart(navigate))
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setSignInForm({...signInForm, [name]: value})
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch(emailSignInStart(email, password, navigate))
        resetFormFields()
    }
    

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <p>Sign in with email and password</p>
            {error &&
                <p>{error.message}</p>
            }
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    inputOptions={{
                        type:'email',
                        onChange:handleChange,
                        name:'email',
                        value:email,
                        required:true
                    }}
                />
                <FormInput
                    label='Password'
                    inputOptions={{
                        type:'password',
                        onChange:handleChange,
                        name:'password',
                        value:password,
                        required:true
                    }}
                />
                <ButtonsContainer>
                    <Button isLoading={emailSignInIsLoading} isDisabled={emailSignInButton} type='submit'>Sign In</Button>
                    <Button isLoading={googleSignInIsLoading} isDisabled={googleSignInButton} type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                    Google Sign In
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm