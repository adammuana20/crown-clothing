import styled from "styled-components";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export const StyledOutlineHeart = styled(AiOutlineHeart)`
    color: rgb(216, 44, 35); /* Set your desired icon color here */
    font-size: 2rem;
    
    &:hover {
        filter: drop-shadow(0 0 4px white) drop-shadow(0 0 5px rgba(255, 255, 255, 1));
    }
`;

export const StyledFillHeart = styled(AiFillHeart)`
    color: rgb(216, 44, 35); /* Set your desired icon color here */
    font-size: 2rem;
    
    &:hover {
        filter: drop-shadow(0 0 4px white) drop-shadow(0 0 5px rgba(255, 255, 255, 1));
    }
`

export const WishlistItemButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;

    &:disabled {
        ${StyledOutlineHeart}, ${StyledFillHeart} {
            opacity: 0.7;
        }
    }
`;