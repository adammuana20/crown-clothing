import { ChangeEvent, FC, FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { selectUpdatingUserPassword, selectUpdatingUserInfo } from "../../../store/user/User.selector"

import FormInput from "../../form-input/FormInput.component"
import Button from "../../button/Button.component"
import { updateUserPasswordStart } from "../../../store/user/User.action"
import { useToast } from "../../../contexts/Toast.context"

import { ProfilePasswordContainer } from "./ChangePassword.styles"

const defaultFormFields = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
}

const ChangePassword = () => {
    const [password, setPassword] = useState(defaultFormFields)
    const { oldPassword, newPassword, confirmNewPassword } = password
    const dispatch = useDispatch()
    const isUpdatingUserPassword = useSelector(selectUpdatingUserPassword)
    const isUpdatingUserInfo = useSelector(selectUpdatingUserInfo)
    const { showToast } = useToast()

    const resetFormFields = () => {
        setPassword(defaultFormFields)
    }

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(newPassword !== confirmNewPassword) {
            showToast('warning', 'Password did not match')
            return
        }

        dispatch(updateUserPasswordStart(oldPassword, newPassword, showToast))
        resetFormFields()
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setPassword({ ...password, [name]: value })
    }

    return (
        <ProfilePasswordContainer>
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Old Password'
                    inputOptions={{
                        type:'password',
                        onChange:handleChange,
                        name:'oldPassword',
                        value:oldPassword,
                        required:true
                    }}
                />
                <FormInput
                    label='New Password'
                    inputOptions={{
                        type:'password',
                        onChange:handleChange,
                        name:'newPassword',
                        value:newPassword,
                        minLength:6,
                        required:true,
                    }}
                />
                <FormInput
                    label='Confirm New Password'
                    inputOptions={{
                        type:'password',
                        onChange:handleChange,
                        name:'confirmNewPassword',
                        value:confirmNewPassword,
                        minLength:6,
                        required:true,
                    }}
                />
                <Button isLoading={isUpdatingUserPassword} isDisabled={isUpdatingUserInfo} >Save Password</Button>
            </form>
        </ProfilePasswordContainer>
    )
}

export default ChangePassword