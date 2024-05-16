import styled from "styled-components";

import { Swiper } from 'swiper/react'


export const SwiperContainer = styled(Swiper)`
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;

    .swiper-pagination-bullet,
    .swiper-pagination-bullet-active {
        background-color:  #fff;
    }

    @media only screen and (max-width: 800px) {
        height: 20rem;
    }

    @media only screen and (max-width: 500px) {
        height: 15rem;
    }
`

export const ImgSlider = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
`