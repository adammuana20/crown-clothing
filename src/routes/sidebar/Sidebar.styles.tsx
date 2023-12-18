import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";


const isActive = 'active';

const activeStyle = css`
    font-weight: bold;
    text-decoration: none;
`

const isMenuOpenStyles = css`
    transform: translateX(0);
    visibility: visible;
`

type SidebarContainerProps = {
    $isMenuOpen?: boolean;
}

export const SidebarContainer = styled.div<SidebarContainerProps>`
    width: 40%;
    position: fixed;
    top: 0;
    right: 0;
    background-color: var(--background);
    height: 100%;
    z-index: 100;
    transform: translateX(100%);
    transition: transform .3s ease;
    color: var(--color-dark);

    ${({$isMenuOpen}) => $isMenuOpen && isMenuOpenStyles}
`

export const SidebarNavLinkContainer = styled.div`
    padding: 1rem;
    font-weight: 600;

    &:not(:last-child) {
        border-bottom: 1px solid #ccc;
    }

    @media only screen and (min-width: 801px) {
        padding: .6rem;
    }
`

export const MobileNavlink = styled(NavLink)`
    padding: 0;
    text-transform: none;
    font-size: 1rem;
    font-weight: 400;

    &.${isActive} {
        ${activeStyle}
    }
`

export const SidebarTitleContainer = styled.div`
    padding: .4rem 1rem;
    font-size: 1.2rem;
    font-weight: 600;
`

export const SidebarOverlay = styled.div`
    background-color: rgba(0,0,0,.5);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
`