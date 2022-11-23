import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "./Slider.styled";
import Image from "next/image";
import { getStrapiMedia } from "../../lib/media";

const ArrowNext = ({ currentSlide, slideCount, ...props }) => (
  <button
    {...props}
    className={
      "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
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
      "slick-next slick-arrow" +
      (currentSlide === slideCount - 1 ? " slick-disabled" : "")
    }
    aria-hidden="true"
    aria-disabled={currentSlide === slideCount - 1 ? true : false}
    type="button"
  >
    Next
  </button>
);

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <ArrowNext />,
  prevArrow: <ArrowPrev />,
};

const SliderComp = ({ slides, height }) => {
  return (
    <Container height={height}>
      <Slider {...settings}>
        {slides.map((slide, index) => {
          if (!slide.image) {
            slide = {
              ...slide,
              image: { data: { attributes: slide.attributes } },
            };
          }
          return (
            <div key={index} className="slideWrapper">
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
              />
            </div>
          );
        })}
      </Slider>
    </Container>
  );
};

export default SliderComp;
