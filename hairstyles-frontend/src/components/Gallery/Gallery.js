import Image from 'next/image';
import React, { useEffect } from 'react'
import Slider from 'react-slick';
import { getStrapiMedia } from '../../lib/media';
import { Container } from "./Gallery.styled"
import closeIco from "../../static/icons/close.svg"
import useHideScrollbar from '../../hooks/useHideScrollbar';

const ArrowNext = ({ currentSlide, slideCount, ...props }) => (
    <button
        {...props}
        className={
            "slick-next slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
        }
        aria-hidden="true"
        aria-disabled={currentSlide === 0 ? true : false}
        type="button"
    >
        Previous
    </button>
);
const ArrowPrev = ({ currentSlide, slideCount, ...props }) => (
    <button
        {...props}
        className={
            "slick-prev slick-arrow" +
            (currentSlide === slideCount - 1 ? " slick-disabled" : "")
        }
        aria-hidden="true"
        aria-disabled={currentSlide === slideCount - 1 ? true : false}
        type="button"
    >
        Next
    </button>
);

const Gallery = ({ slides, setShowZoom }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden'
    }, [])
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <ArrowNext />,
        prevArrow: <ArrowPrev />,
    };
    return (<Container>
        <button className='closeButton' onClick={() => {
            document.body.style.overflow = "auto"
            setShowZoom(false)
        }}>
            <Image src={closeIco} alt="close" />
        </button>
        <Slider {...settings}>
            {slides.map((slide, index) => {
                if (!slide.image) {
                    slide = {
                        ...slide,
                        image: { data: { attributes: slide.attributes } },
                    };
                }
                return (
                    <div key={index} className="slideContainer">
                        <div className="slideWrapper">
                            <Image
                                loader={() => getStrapiMedia(slide.image)}
                                src={getStrapiMedia(slide.image)}
                                width={
                                    slide.image?.data.attributes.width || slide.attributes.width
                                }
                                height={
                                    slide.image?.data.attributes.height || slide.attributes.height
                                }
                                unoptimized
                                style={{ background: slide.background }}
                                className="img"
                                alt={slide.image?.data.attributes.alternativeText}
                            />
                        </div>
                    </div>
                );
            })}
        </Slider>
    </Container>);
}

export default Gallery;