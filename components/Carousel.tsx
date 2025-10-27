import React, { useState, useEffect, useCallback } from 'react';
import { Offer } from '../types';

interface CarouselProps {
    items: Offer[];
    onBuyNowClick: () => void;
}

const Carousel: React.FC<CarouselProps> = ({ items, onBuyNowClick }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    }, [items.length]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        return () => clearInterval(slideInterval);
    }, [nextSlide]);

    return (
        <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
            {/* Carousel track */}
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {items.map((item) => (
                    <div
                        key={item.id}
                        className={`w-full flex-shrink-0 h-48 p-6 flex flex-col justify-between ${item.textColor} ${!item.backgroundImage ? item.bgColor : ''} bg-cover bg-center`}
                        style={item.backgroundImage ? {
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${item.backgroundImage})`,
                        } : {}}
                    >
                        <div>
                            <h3 className="text-xl font-bold" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>{item.title}</h3>
                            <p className="mt-1" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>{item.description}</p>
                        </div>
                        <button
                            onClick={onBuyNowClick}
                            className="self-start bg-white/90 backdrop-blur-sm text-gray-800 font-bold py-2 px-4 rounded-full hover:bg-white transition-all duration-300 text-sm shadow-md hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white/50"
                        >
                            Buy Now
                        </button>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Previous slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-opacity focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Next slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                            currentIndex === index ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Carousel;