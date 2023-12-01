import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import ChangePassword from "../../components/profile/change-password/ChangePassword.component"
import EditProfile from "../../components/profile/edit-profile/EditProfile.component"
import MobileBottomMenu from "../mobile-bottom-menu/MobileBottomMenu.component"
import PopUp from "../../components/ui/popup/PopUp.component"

import { clearUserErrorMessage } from "../../store/user/User.action"
import { usePopup } from "../../hooks/usePopup.hooks"

import { selectCurrentUser, selectProviderID, selectUserError } from "../../store/user/User.selector"


const Profile = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(selectCurrentUser)
    const providerID = useSelector(selectProviderID)
    const userError = useSelector(selectUserError)
    const { showToast, handleClose, toasts } = usePopup()

    useEffect(() => {
        if(userError) {
            showToast('error', userError.message)
            dispatch(clearUserErrorMessage())
        }
    }, [userError])

    
    return (
        <>
            <EditProfile currentUser={currentUser} showToast={showToast} />
            { providerID === 'password' &&
               <ChangePassword showToast={showToast} />
            }
            <PopUp handleClose={handleClose} toasts={toasts} />
            <MobileBottomMenu/>
        </>
    )
}

export default Profile