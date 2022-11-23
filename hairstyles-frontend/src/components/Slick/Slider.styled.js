import styled from "styled-components";

export const Container = styled.div`
  .slick-slide {
    height: auto; // ← that must not be ignored
  }
  .slick-track {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: stretch;
  }
  .slick-prev,
  .slick-next {
    z-index: 1;
  }
  .slick-next {
    right: 15px;
  }
  .slick-prev {
    left: 15px;
    z-index: 1;
  }
  .slideWrapper {
    width: 100%;
    height: ${({ height }) => `${height}px !important`};
    span,
    img {
      width: 100% !important;
      height: ${({ height }) => `${height}px !important`};
      object-fit: cover;
      object-position: 50% 25%;
    }
  }
`;
