import { ChangeEvent, FC, FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FaRegUser } from "react-icons/fa"

import FormInput from "../../form-input/FormInput.component"
import Button from "../../button/Button.component"

import { selectUpdatingUserInfo, selectUpdatingUserPassword } from "../../../store/user/User.selector"
import { updateUserInfoStart } from "../../../store/user/User.action"
import { UserData } from "../../../utils/firebase/Firebase.utils"

import { capitalizeFirstLetter } from "../../../utils/helpers/Helpers.utils"

import { ImageContainer, ImageWrapper, Name, ChangePhotoButtonContainer, ChangePhotoButton, ImageUrl, ProfileContainer } from "./EditProfile.styles"
import { useToast } from "../../../contexts/Toast.context"

type EditProfileProps = {
    currentUser: UserData | null
}

const EditProfile: FC<EditProfileProps> = ({ currentUser }) => {
    const defaultFormFields = {
        displayName: currentUser?.displayName || '',
        email: currentUser?.email || '',
        imageUrl: currentUser?.imageUrl || '',
    }

    const [userInfo, setUserInfo] = useState(defaultFormFields)
    const { email, displayName, imageUrl } = userInfo
    const [selectedImage, setSelectedImage] = useState('')
    const [disableButton, setDisableButton] = useState(true)
    const dispatch = useDispatch()
    const isUpdatingUserInfo = useSelector(selectUpdatingUserInfo)
    const isUpdatingUserPassword = useSelector(selectUpdatingUserPassword)
    const { showToast } = useToast()
    

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(updateUserInfoStart(displayName, email, imageUrl, selectedImage, showToast))
    }

    const imageChange = (file: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name, files } = e.target
        setDisableButton(false)

        if(files && files[0]) {
            const selectedFile = files[0]
            
            imageChange(selectedFile);
            setUserInfo({ ...userInfo, [name]: selectedFile });
        } else {
            setUserInfo({ ...userInfo, [name]: value });
        }
    }


    return (
        <ProfileContainer>
            <h2>My Profile</h2>
            <form onSubmit={handleSubmit}>
                <ImageWrapper>
                    { selectedImage ? 
                            <ImageContainer>
                                <ImageUrl $imageUrl={imageUrl} $selectedImageUrl={selectedImage} />
                            </ImageContainer>
                        : imageUrl ? 
                            <ImageContainer>
                                <ImageUrl $imageUrl={imageUrl} $selectedImageUrl={selectedImage} />
                            </ImageContainer>
                        : displayName ?
                            <Name>
                                { capitalizeFirstLetter(displayName) }
                            </Name>
                        : <FaRegUser size={27} />
                    }
                    <ChangePhotoButtonContainer>
                        <input type='file' id='imageUrl' name='imageUrl' onChange={handleChange} accept="image/x-png,image/jpeg"/>
                        <ChangePhotoButton htmlFor='imageUrl'>Change Photo</ChangePhotoButton>
                    </ChangePhotoButtonContainer>
                </ImageWrapper>
                <FormInput
                    label='Name'
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
                <Button isDisabled={isUpdatingUserPassword || disableButton} isLoading={isUpdatingUserInfo}>Save Profile</Button>
            </form>
        </ProfileContainer>
    )
}

export default EditProfile