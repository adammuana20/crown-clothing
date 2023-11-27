import styled from "styled-components";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export const StyledOutlineHeart = styled(AiOutlineHeart)`
    color: red; /* Set your desired icon color here */
    font-size: 2rem;
    
    &:hover {
        filter: drop-shadow(0 0 5px black) drop-shadow(0 0 50px rgba(255, 255, 255, 1));
    }
`;

export const StyledFillHeart = styled(AiFillHeart)`
    color: red; /* Set your desired icon color here */
    font-size: 2rem;
    
    &:hover {
        filter: drop-shadow(0 0 5px black) drop-shadow(0 0 10px rgba(255, 255, 255, 1));
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