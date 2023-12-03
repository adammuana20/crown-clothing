import { useState, FormEvent, ChangeEvent, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button, { BUTTON_TYPE_CLASSES } from '../../button/Button.component'
import FormInput from '../../form-input/FormInput.component'
import { useToast } from '../../../contexts/Toast.context'

import { googleSignInStart, emailSignInStart } from '../../../store/user/User.action'
import { selectEmailSignInIsLoading, selectGoogleSignInIsLoading, selectEmailSignInButton, selectGoogleSignInButton } from '../../../store/user/User.selector'

import { SignInContainer, ButtonsContainer, NewAccountButton } from './SignInForm.styles'
import { useNavigate } from 'react-router-dom'


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
    const dispatch = useDispatch()
    const { showToast } = useToast()
    const navigate = useNavigate()

    const resetFormFields = () => {
        setSignInForm(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart(showToast))
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setSignInForm({...signInForm, [name]: value})
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch(emailSignInStart(email, password, showToast))
        resetFormFields()
    }

    const createNewAccount = () => {
        navigate('/sign-up')
    }
    

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <p>Sign in with email and password</p>
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
                <hr></hr>
                <NewAccountButton type='button' buttonType={BUTTON_TYPE_CLASSES.inverted} isDisabled={emailSignInButton || googleSignInButton} onClick={createNewAccount} >Create an account</NewAccountButton>
            </form>
        </SignInContainer>
    )
}

export default SignInForm