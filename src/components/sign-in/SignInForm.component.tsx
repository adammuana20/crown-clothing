import { useState, FormEvent, ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'

import Button, { BUTTON_TYPE_CLASSES } from '../button/Button.component'
import FormInput from '../form-input/FormInput.component'

import { googleSignInStart, emailSignInStart } from '../../store/user/User.action'

import { SignInContainer, ButtonsContainer } from './SignInForm.styles'


const defaultFormFields = {
    email: '',
    password: ''
}

type InputOptions = {
    type: string;
    onChange: Function;
    name: string;
    value: string;
    required: boolean;
}

const SignInForm = () => {
    const [signInForm, setSignInForm] = useState(defaultFormFields)
    const { email, password } = signInForm

    const dispatch = useDispatch()

    const resetFormFields = () => {
        setSignInForm(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart())
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setSignInForm({...signInForm, [name]: value})
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(emailSignInStart(email, password))

        resetFormFields()
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
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                    Google Sign In
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm