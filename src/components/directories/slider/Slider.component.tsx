import { SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination,  } from "swiper/modules";

import slider1 from '../../../assets/Prhps1.jpg'
import slider2 from '../../../assets/Prhps2.jpg'
import slider3 from '../../../assets/Prhps3.jpg'

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";

import { SwiperContainer, ImgSlider } from "./Slider.styles"

const Slider = () => {
    return (
        <SwiperContainer     
            modules={[Autoplay, Pagination]}
            loop={true}
            autoplay={{
                delay: 4000,
            }}
            pagination={{
                clickable: true,
            }}
        >
            <SwiperSlide>
                <ImgSlider src={slider2} alt={'slider-2'} />
            </SwiperSlide>
            <SwiperSlide>
                <ImgSlider src={slider3} alt={'slider-3'} />
            </SwiperSlide>
            <SwiperSlide>
                <ImgSlider src={slider1} alt={'slider-1'} />
            </SwiperSlide>
        </SwiperContainer>
    )
}

export default Slider