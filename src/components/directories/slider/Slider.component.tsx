import { FC, useEffect, useState, useRef } from "react"

import { AutoSliderContainer, SliderSlide, ImgSlider, SliderSlides, DotContainer, Dot } from "./Slider.styles"


type SliderProps = {
    imageUrls: string[];
}

const Slider: FC<SliderProps> = ({ imageUrls }) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const interval = 3000

    const sliderRef = useRef<HTMLDivElement>(null);
    let startX: number | undefined;

    useEffect(() => {
        const handleTouchStart = (e: TouchEvent | MouseEvent) => {
            startX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
        };

        const handleTouchMove = (e: TouchEvent | MouseEvent) => {
        const moveX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
            if(startX !== undefined) {
            const deltaX = moveX - startX;

            // Implement your swipe logic based on deltaX
            if (deltaX < 0) {
                // Swipe to the right
                setCurrentSlide((prevSlide) => (prevSlide + 1) % imageUrls.length);
            } else if (deltaX > 0) {
                // Swipe to the left
                setCurrentSlide((prevSlide) => (prevSlide - 1 + imageUrls.length) % imageUrls.length);
            }
    
            // Reset startX to handle the next swipe
            startX = undefined;
            }
        };

        const sliderElement = sliderRef.current as HTMLElement | null;

        if (sliderElement) {
            sliderElement.addEventListener('touchstart', handleTouchStart);
            sliderElement.addEventListener('touchmove', handleTouchMove);

            sliderElement.addEventListener('mousedown', handleTouchStart);
            sliderElement.addEventListener('mousemove', handleTouchMove);
        }

        return () => {
            // Cleanup event listeners when the component unmounts
            if (sliderElement) {
                sliderElement.removeEventListener('touchstart', handleTouchStart);
                sliderElement.removeEventListener('touchmove', handleTouchMove);

                sliderElement.removeEventListener('mousedown', handleTouchStart);
                sliderElement.removeEventListener('mousemove', handleTouchMove);
            }
        };
    }, []);

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
        <AutoSliderContainer ref={sliderRef}>
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