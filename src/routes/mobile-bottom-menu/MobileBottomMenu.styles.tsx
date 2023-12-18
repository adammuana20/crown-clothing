import styled, { css } from "styled-components";

import { MobileNavlink } from "../sidebar/Sidebar.styles";
import { ItemCount } from "../../components/cart/cart-icon/CartIcon.styles";

const isActive = 'active';

const activeStyle = css`
    color: #d82c23;
    text-decoration: none;
`

export const BottomMenu = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--background);
    z-index: 9;
    padding: .6rem;
    display: flex;
    align-items: center;
    border-top: 1px solid #ccc;

    @media only screen and (min-width: 801px) {
        display: none;
    }
`

export const ListContainer = styled.div`
    flex: 1 1;
`

export const IconStyles = styled.div`
    font-size: 1.5rem;
    position: relative;
`

export const BottomMenuNavLink = styled(MobileNavlink)`
    display: flex;
    flex-direction: column;
    align-items: center;

    &.${isActive} {
        ${activeStyle}
    }
`

export const MobileItemCount = styled(ItemCount)`
    bottom: 15px;
    right: -18px;
`