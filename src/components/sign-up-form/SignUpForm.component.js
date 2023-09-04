import { useState } from 'react'

import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth
} from '../../utils/firebase/Firebase.utils'

import FormInput from '../form-input/FormInput.component'
import Button from '../button/Button.component'

import './SignUpForm.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormFields({ ...formFields, [name]: value })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(password !== confirmPassword) {
            alert('Password Did not match');
            return
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password)
            await createUserDocumentFromAuth(user, { displayName })
            
            resetFormFields()
        } catch (err) {
            if(err.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already exist.')
            }
            console.log('User creation error:', err);
        }
            // console.log('Form Submitted');
            
            //const userDocRef = await createUserDocumentFromEmailAndPassword(form, displayName);
    }

    return (
        <div className='sign-up-container'>
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
        </div>
    )
}

export default SignUpForm