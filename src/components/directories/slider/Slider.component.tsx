import { FC, useEffect, useState, useRef, useCallback } from "react"

import { SliderContainer, ImgSlider, DotContainer, Dot, ImgContainer, SliderContainerOverflow } from "./Slider.styles"


type SliderProps = {
    sliders: { imageUrl: string; title: string; }[];
}

const Slider: FC<SliderProps> = ({ sliders }) => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [startX, setStartX] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const goToNext = useCallback(() => {
        const isLastSlide = currentSlide === sliders.length -1
        const newIndex = isLastSlide ?  0 : currentSlide + 1
        setCurrentSlide(newIndex)
    }, [currentSlide, sliders.length])

    useEffect(() => {
        if (timerRef.current && !isDragging) {
            clearTimeout(timerRef.current);
        }
    
        if (!isDragging) {
            timerRef.current = setTimeout(() => {
                goToNext();
            }, 2000);
        }
    
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [goToNext, isDragging])


    const goToSlide = (index: number) => {
        setCurrentSlide(index)
    }

    const handleTouchStart = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault()
        setStartX("touches" in e ? e.touches[0].clientX : e.clientX);
    }

    const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (!startX || isDragging) return;
    
        const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
        const deltaX = currentX - startX;
    
        if (deltaX > 50) {
          // Dragged to the right
          setCurrentSlide((prev) => (prev === 0 ? sliders.length - 1 : prev - 1));
          setIsDragging(true);
        } else if (deltaX < -50) {
          // Dragged to the left
          setCurrentSlide((prev) => (prev === sliders.length - 1 ? 0 : prev + 1));
          setIsDragging(true);
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        setStartX(null);
    };

    return (
        <>
            <DotContainer>
                { sliders.map((_, index) => (
                    <Dot key={index} onClick={() => goToSlide(index)} $isActive={currentSlide === index} />
                ))}
            </DotContainer>
            <SliderContainerOverflow>
                <SliderContainer
                    $currentSlide={currentSlide}
                    onMouseDown={handleTouchStart}
                    onTouchStart={handleTouchStart}
                    onMouseMove={handleTouchMove}
                    onTouchMove={handleTouchMove}
                    onMouseUp={handleTouchEnd}
                    onTouchEnd={handleTouchEnd}
                >
                    { sliders.map((slider, idx) => (
                        <ImgContainer key={idx} >
                            <ImgSlider src={slider.imageUrl} alt={slider.title} />
                        </ImgContainer>
                        ))
                    }
                </SliderContainer>
            </SliderContainerOverflow>
        </>
    )
}

export default Slider