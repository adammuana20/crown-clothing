import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'

import { BaseButton } from "../../components/button/Button.styles";


const isActive = 'active';

const activeStyle = css`
    font-weight: bold;
    text-decoration: underline;
    text-underline-offset: 0.2em;
`

export const NavLinks = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

export const DesktopNavLink = styled(NavLink)`
    padding: 10px 5px 10px 20px;
    cursor: pointer;

    &:hover{
      font-weight: bold;
    }

    &.${isActive} {
        ${activeStyle}
    }

    @media only screen and (max-width: 800px) {
        display: none;
    }
`

export const UserIcon = styled.div`
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 50%;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    overflow: hidden;
    background-color: transparent;
    border: 1px solid transparent;

    @media only screen and (max-width: 800px) {
        display: none;
    }
`

export const UserTextContainer = styled.div`
    background-color: var(--color-dark);
    color: var(--color-light);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    img {
        width: 100%;
        height: 100%;
    }
`

export const MenuDropdownContainer = styled.div`
    width: 14rem;
    position: absolute;
    border-radius: .5rem;
    top: 100%;
    right: 0;
    margin-top: .7rem;
    background-color: var(--background-light);
    z-index: 1;    
    border: 1px solid rgba(0,0,0, .1);
    
    ${DesktopNavLink}:not(:last-child) {
        border-bottom: 1px solid #ccc;
    }

    ${DesktopNavLink} {
        display: block;
        padding: .54rem;
        width: 100%;
    }

    @media only screen and (max-width: 800px) {
        display: none;
    }
`

export const LogoutButton = styled(BaseButton)`
    width: 100%;
    border-radius: 6px;
`