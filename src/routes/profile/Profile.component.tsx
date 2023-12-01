import { useSelector } from "react-redux"

import ChangePassword from "../../components/profile/change-password/ChangePassword.component"
import EditProfile from "../../components/profile/edit-profile/EditProfile.component"
import MobileBottomMenu from "../mobile-bottom-menu/MobileBottomMenu.component"

import { selectCurrentUser, selectProviderID } from "../../store/user/User.selector"


const Profile = () => {
    const currentUser = useSelector(selectCurrentUser)
    const providerID = useSelector(selectProviderID)
    
    return (
        <>
            <EditProfile currentUser={currentUser} />
            { providerID === 'password' &&
               <ChangePassword />
            }
            <MobileBottomMenu/>
        </>
    )
}

export default Profile