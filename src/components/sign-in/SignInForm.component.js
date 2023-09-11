import { useState } from 'react'

import Button, { BUTTON_TYPE_CLASSES } from '../button/Button.component'
import FormInput from '../form-input/FormInput.component'

import { 
    signInWithGooglePopup, 
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/Firebase.utils'

import { SignInContainer, ButtonsContainer } from './SignInForm.styles.js'


const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [signInForm, setSignInForm] = useState(defaultFormFields)
    const { email, password } = signInForm

    const resetFormFields = () => {
        setSignInForm(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        try {
            await signInWithGooglePopup()
        } catch(err) {
            switch(err.code) {
                case 'auth/popup-closed-by-user':
                    console.log('Google Signin Pop-up Closed');
                    break
                default:
                    console.log(err);
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setSignInForm({...signInForm, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password)

            resetFormFields()
        } catch (err) {
            switch(err.code) {
                case 'auth/user-not-found':
                    alert('Email does not exist')
                    break
                case 'auth/wrong-password':
                    alert('Incorrect Password for Email')
                    break
                default:
                    console.log(err)
            }
        }
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