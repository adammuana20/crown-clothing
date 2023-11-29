import styled, { css } from "styled-components";


type SliderProps = {
    $isActive: boolean;
}

export const OutletContainer = styled.div`
    
`

export const SliderActive = css`
    display: block;
    opacity: 1;
`

export const AutoSliderContainer = styled.div`
    position: relative;
    overflow: hidden;
`

export const SliderSlides = styled.div`
    display: flex;
    transition: transform 0.5s ease-in-out;
`

export const SliderSlide = styled.div`
    flex: 0 0 100%;
    height: 35rem;
`

export const ImgSlider = styled.img`
    width: 100%;
    height: 100%;
`

export const DotContainer = styled.div`
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 8px;
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