import { FC, Key } from 'react'
import { useNavigate } from 'react-router-dom'

import { DirectoryItemContainer, BackgroundImage, Body } from './DirectoryItem.styles'

type DirectoryCategory = {
  id: Key;
  title: string;
  imageUrl: string;
  route: string;
}

type DirectoryItemProps = {
  category: DirectoryCategory;
}

const DirectoryItem: FC<DirectoryItemProps> = ({ category }) => {
    const { imageUrl, title, route } = category
    const navigate = useNavigate()

    const onNavigateHandler = () => navigate(route)

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