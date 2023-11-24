import styled from "styled-components";

type EditProfilePropsImageUrl = {
    $imageUrl: string;
    $selectedImageUrl: string;
}

export const ImageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const ImageContainer = styled.div`
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 1rem;
`

export const ImageUrl = styled.div<EditProfilePropsImageUrl>`
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top;
    background-image: ${({$imageUrl, $selectedImageUrl}) => $selectedImageUrl ? `url(${ $selectedImageUrl })` : `url(${ $imageUrl })`};
`

export const Name = styled.div`
    background-color: black;
    color: #eee;
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    margin-bottom: 1rem;
`

export const ChangePhotoButtonContainer = styled.div`
    position: relative;
    overflow: hidden;
    background-color: black;
    color: #fff;

    input[type='file'] {
        display: none;
    }
`

export const ChangePhotoButton = styled.label`
    display: flex;
    height: 50px;
    min-width: 165px;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    text-transform: uppercase;
    padding: 0 30px;
    border: 1px solid black;
    
    &:hover {
        cursor: pointer;
        background-color: #eee;
        color: black;
    }
`