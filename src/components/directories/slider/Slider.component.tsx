import { FC, useEffect, useState } from "react"

import { AutoSliderContainer, SliderSlide, ImgSlider, SliderSlides, DotContainer, Dot } from "./Slider.styles"


type SliderProps = {
    imageUrls: string[];
}

const Slider: FC<SliderProps> = ({ imageUrls }) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const interval = 3000

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % imageUrls.length)
        }, interval)

        return () => clearInterval(intervalId);
    }, [imageUrls.length, interval])

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
    }

    return (
        <AutoSliderContainer>
            <DotContainer>
                {imageUrls.map((_, index) => (
                    <Dot key={index} onClick={() => goToSlide(index)} $isActive={currentSlide === index} />
                ))}
            </DotContainer>
            <SliderSlides style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            { imageUrls.map((imageUrl, idx) => (
                <SliderSlide
                    key={idx}
                    onClick={() => goToSlide(idx)}
                >
                    <ImgSlider src={imageUrl} alt={`Slide ${idx + 1}`} />
                </SliderSlide>
                ))
            }
            </SliderSlides>
        </AutoSliderContainer>
    )
}

export default Slider