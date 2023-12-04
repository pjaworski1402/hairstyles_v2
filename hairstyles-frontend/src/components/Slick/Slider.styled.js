import styled from "styled-components";
import { device } from "../../styles/device";

export const Container = styled.div`
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
    :before{
      color:gray!important;
    }
  }
  .slick-next {
    right: 15px;
  }
  .slick-prev {
    left: 15px;
    z-index: 1;
  }
  .slideContainer{
    position:relative;
    .slideWrapper {
      width: 100%;
      height: ${({ height }) => `${height}px !important`};
      span,
      img {
        width: 100% !important;
        height: ${({ height }) => `${height}px !important`};
        object-fit: contain;
      }
    }
    .buttonFull{
      display:none;
      @media ${device.tablet} {
        display:block;
        position:absolute;
        bottom:14px;
        right:36px;
        background-color:white;
        padding:4px;
        border-radius:6px;
        width:32px;
        height:32px;
        transition:0.2s background-color;
        :hover{
          background-color:rgba(255,255,255,0.8);
        }
      }
    }
  }
`;
