import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container } from "./Slider.styled";
import Image from "next/image";
import { getStrapiMedia } from "../../lib/media";
import fullIco from "../../static/icons/full.svg";
import Gallery from "../Gallery/Gallery";

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

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <ArrowNext />,
  prevArrow: <ArrowPrev />,
};

const SliderComp = ({ slides, height, zoom }) => {
  const [showZoom, setShowZoom] = useState(false);

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
              {zoom && (
                <button onClick={() => setShowZoom(true)} className="buttonFull">
                  <Image src={fullIco} alt="full" />
                </button>
              )}
            </div>
          );
        })}
      </Slider>
      {showZoom && (
        <Gallery slides={slides} setShowZoom={setShowZoom} />
      )}
    </Container>
  );
};

export default SliderComp;
