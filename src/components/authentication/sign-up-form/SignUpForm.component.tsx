import { useState, FormEvent, ChangeEvent } from 'react'
import { AuthError, AuthErrorCodes } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'

import FormInput from '../../form-input/FormInput.component'
import { signUpStart } from '../../../store/user/User.action'
import { selectSignUpIsLoading } from '../../../store/user/User.selector'

import { SignUpContainer, SignUpBtn, BtnContainer } from './SignUpForm.styles'
import { useToast } from '../../../contexts/Toast.context'


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
    const isLoading = useSelector(selectSignUpIsLoading)
    const { showToast } = useToast()

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
            showToast('error', 'Password did not match!')
            return
        }

        dispatch(signUpStart(email, password, displayName, showToast))
        resetFormFields()
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
                        minLength:6,
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
                        minLength:6,
                        required:true
                    }}

                />
                <BtnContainer>
                    <SignUpBtn isLoading={isLoading} type='submit'>Sign Up</SignUpBtn>
                </BtnContainer>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm