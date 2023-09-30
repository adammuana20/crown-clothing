import { useState, FormEvent, ChangeEvent } from 'react'
import { AuthError, AuthErrorCodes } from 'firebase/auth'
import { useDispatch } from 'react-redux'

import FormInput from '../form-input/FormInput.component'
import Button from '../button/Button.component'
import { signUpStart } from '../../store/user/User.action'

import { SignUpContainer } from './SignUpForm.styles'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields
    const dispatch = useDispatch()

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormFields({ ...formFields, [name]: value })

    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(password !== confirmPassword) {
            alert('Password Did not match');
            return
        }

        try {
            dispatch(signUpStart(email, password, displayName))
            resetFormFields()
        } catch (err) {
            if((err as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert('Cannot create user, email already exist.')
            }
            console.log('User creation error:', err);
        }
            // console.log('Form Submitted');
            
            //const userDocRef = await createUserDocumentFromEmailAndPassword(form, displayName);
    }

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name'
                    inputOptions={{
                        type:'text',
                        onChange:handleChange,
                        name:'displayName',
                        value:displayName,
                        required:true
                    }}
                />
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
                        minLength:'6',
                        required:true
                    }}
                />
                <FormInput
                    label='Confirm Password'
                    inputOptions={{
                        type:'password',
                        onChange:handleChange,
                        name:'confirmPassword',
                        value:confirmPassword,
                        minLength:'6',
                        required:true
                    }}

                />
                <Button type='submit'>Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm