import { ChangeEvent, FC, FormEvent, useState } from "react"
import { FaRegUser } from "react-icons/fa"

import { capitalizeFirstLetter } from "../../../utils/helpers/Helpers.utils"

import FormInput from "../../form-input/FormInput.component"
import { UserData, updateUserProfileFromDocument } from "../../../utils/firebase/Firebase.utils"
import Button from "../../button/Button.component"

import { ImageContainer, ImageWrapper, Name, ChangePhotoButtonContainer, ChangePhotoButton, ImageUrl } from "./EditProfile.styles"

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
    
    const resetFormFields = () => {
        setUserInfo(defaultFormFields)
    }
    

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await updateUserProfileFromDocument(displayName, email, imageUrl, selectedImage)
        resetFormFields()
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
        <>
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
                <Button isDisabled={disableButton}>Save Profile</Button>
            </form>
        </>
    )
}

export default EditProfile