import styled from "styled-components";

type PopUpProps = {
    $progress?: number;
    $top?: number;
    $type?: string;
}

// export const PopUpContainer = styled.div`
//     position: fixed;
//     bottom: 5rem;
//     right: 2rem;
//     /* transform: translate(-50%, -50%); */
//     width: 20rem;
//     background: #fff;
//     z-index: 10;
//     border-radius: .3rem;
//     flex-direction: column;
//     box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
// `

export const PopUpContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 10;
  transition: left 0.5s ease-in-out;
`;

export const ToastContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
`

export const IconMessageContainer = styled.div`
    display: flex;
    align-items: center;
`

export const Message = styled.span`
    color: #000;
    font-size: 1rem;
    font-weight: 600;
    padding: 1rem .6rem;
`

export const Line = styled.div<PopUpProps>`
    height: 5px;
    width: ${({ $progress }) => $progress}%;
    background-color: ${({ $type }) => $type === 'success' ? '#22bb33' : '#bb2124'};
    transition: width 1s linear;
    border-bottom-left-radius: .3rem;
    border-bottom-right-radius: .3rem;
`;

export const ToastWrapper = styled.div<PopUpProps>`
    position: fixed;
    bottom: ${({ $top }) => `${$top}px`};
    right: 2rem;
    /* transform: translate(-50%, -50%); */
    width: 20rem;
    background: #fff;
    border-radius: .3rem;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.3);
`;