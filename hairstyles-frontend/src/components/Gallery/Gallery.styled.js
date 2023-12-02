import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  z-index:999;
  width: 100%;
  height: 100vh;
  background: white;
  top:0;
  left: 0;
  .closeButton{
    display: block;
    width: 48px;
    height:48px;
    margin: 16px 16px 32px auto;
  }
  .slick-slide {
    height: auto;
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
  .slideContainer{
      width: 100%;
      height: 100%;
    .slideWrapper {
      width: 100%;
      height: 70vh!important;
      span,
      .img {
        width: 100% !important;
        height: 70vh!important;
        object-fit: contain;
      }
    }
  }
`;