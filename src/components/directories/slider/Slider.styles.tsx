import styled, { css } from "styled-components";

type SliderProps = {
    $isActive?: boolean;
    $currentSlide?: number;
}

export const DotContainer = styled.div`
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 2;
`

export const Dot = styled.div<SliderProps>`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #858381;
    cursor: pointer;

    ${({$isActive}) =>
        $isActive &&
        css`
        height: 15px;
        width: 15px;
        background-color: #fff;
    `}

    &:hover{
        background-color: #fff;
    }
`;

export const SliderContainerOverflow = styled.div`
    overflow: hidden;
    height: 100%;
`

export const SliderContainer = styled.div<SliderProps>`
    height: 100%;
    position: relative;
    transform: translateX(-${({ $currentSlide }) => $currentSlide && $currentSlide * 100}%);
    transition: transform 0.5s ease-in-out;
    display: flex;    
`

export const ImgContainer = styled.div`
    flex: 0 0 100%;
`

export const ImgSlider = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`