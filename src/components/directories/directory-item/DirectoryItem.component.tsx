import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { DirectoryItemContainer, BackgroundImage, Body } from './DirectoryItem.styles'

type DirectoryCategory = {
  title: string;
  imageUrl: string;
}

type DirectoryItemProps = {
  category: DirectoryCategory;
}

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
    const { imageUrl, title } = category
    const navigate = useNavigate()

    const onNavigateHandler = () => navigate(`shop/${title.toLocaleLowerCase()}`)

    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage $imageUrl={imageUrl} />
          <Body>
            <h2>{ title }</h2>
            <p>Shop Now</p>
          </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem