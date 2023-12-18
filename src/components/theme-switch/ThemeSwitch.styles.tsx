import styled from "styled-components";

export const ThemeContainer = styled.div`
    position: fixed;
    right: 2rem;
    z-index: 10;
    bottom: 1.5rem;

    @media only screen and (max-width: 800px) {
        bottom: 5.5rem;
    }
`


export const TooltipBtn = styled.button`
    color: var(--color-dark);
    border: none;
    font-size: 1.4rem;
    padding: .7rem;
    border-radius: 50%;
    line-height: 0;
    cursor: pointer;
    background-color: var(--color-light);
    
    border: 1px solid rgba(255, 255, 255, .6);

    &:hover {
        transform: scale(1.2);
    }

    &.dark-mode {
    }
`

// .top-tooltip {
//     top: 1.5rem;
// }

// .bottom-tooltip {
//     bottom: 1.2rem;
// }