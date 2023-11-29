import { ChangeEvent, FC, FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { selectUpdatingUserPassword, selectUpdatingUserInfo } from "../../../store/user/User.selector"

import { UserData } from "../../../utils/firebase/Firebase.utils"

import FormInput from "../../form-input/FormInput.component"
import Button from "../../button/Button.component"
import { updateUserPasswordStart } from "../../../store/user/User.action"

type ChangePasswordProps = {
    currentUser: UserData | null
}

const defaultFormFields = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
}

const ChangePassword: FC<ChangePasswordProps> = ({ currentUser }) => {
    const [password, setPassword] = useState(defaultFormFields)
    const { oldPassword, newPassword, confirmNewPassword } = password
    const dispatch = useDispatch()
    const isUpdatingUserPassword = useSelector(selectUpdatingUserPassword)
    const isUpdatingUserInfo = useSelector(selectUpdatingUserInfo)

    const resetFormFields = () => {
        setPassword(defaultFormFields)
    }

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(newPassword !== confirmNewPassword) {
            return alert('Password did not match')
        }

        dispatch(updateUserPasswordStart(oldPassword, newPassword))
        resetFormFields()
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setPassword({ ...password, [name]: value })
    }

    return (
        <>
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
                        required:true
                    }}
                />
                <FormInput
                    label='Confirm New Password'
                    inputOptions={{
                        type:'password',
                        onChange:handleChange,
                        name:'confirmNewPassword',
                        value:confirmNewPassword,
                        required:true
                    }}
                />
                <Button isLoading={isUpdatingUserPassword} isDisabled={isUpdatingUserInfo} >Save Password</Button>
            </form>
        </>
    )
}

export default ChangePassword