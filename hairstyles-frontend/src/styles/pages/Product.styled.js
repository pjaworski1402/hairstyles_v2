import styled, { css } from "styled-components";
import sliderIco from "../../static/icons/sliderIco.svg";
import { device } from "../device";

const sliderStyle = css`
.slick-next,
.slick-prev {
  height: 100%;
  background-color: #171a1f33;
  background-image: ${`url(${sliderIco.src})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: 24px 24px;
  ::before {
    display: none;
  }
  top:0;
}
.slick-next {
  right: 0;
  transform:rotateY(0);
}
.slick-prev {
  left: 0;
  transform:rotateY(180deg);
}
`

export const Container = styled.div`
  position:relative;
  .offerInfo{
    width: 100%;
  }
  @media ${device.tablet} {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

export const MobileSlider = styled.div`
  position: sticky;
  top:59px;
  ${sliderStyle}
  @media ${device.tablet} {
    display:none;
  }
`;
export const DesktopSlider = styled.div`
  display: none;
    @media ${device.tablet} {
    display:block;
    ${sliderStyle}
    margin-right: 40px;
    flex-basis: 50%;
    max-width: 50%;
}
`;
export const DesktopContentOffer = styled.div`
  display: none;
  @media ${device.tablet} {
    display: flex;
    flex-wrap: wrap;
    .headerWrapper{
      width: 100%;
      display: flex;
      justify-content: end;
      margin: 24px 0;
      .shareButton{
        display: flex;
        align-items: center;
        gap:6px;
        font-size: 16px;
      }
    }
    .productInfo{
      align-self: center;
      display: flex;
      flex-direction: column;
      gap: 12px;
      height: 90%;
      flex-basis: calc(50% - 40px);
      .title{
        font-size: 32px;
      }
      .priceWrapper{
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        .priceTitle{
          width: 100%;
        }
        .price {
          font-size: 26px;
          color: #171a1f;
          @media ${device.tablet} {
            font-size: 24px;
          }
        }
        .oldPrice {
          font-size: 24px;
          color: #9095a0;
          text-decoration: line-through;
          font-style: italic;
          align-self: flex-end;
          @media ${device.tablet} {
            font-size: 18px;
          }
        }
      }
      .tags{
        .tagTitle{
          width: 100%;
          font-size: 16px;
        }
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
        .tag{
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background-color: var(--contrast);
          color: var(--primary);
          padding:4px;
        }
      }
      .bottomWrapper{
        background-color: var(--primary);
        margin-top: auto;
        margin-bottom: 12px;
        width: 100%;
        .addToCartButton{
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border-radius: 10px;
          background-color: var(--contrast);
          width: 100%;
          color:var(--primary);
          font-size: 16px;
          padding: 12px;
        }
        .removeFromCartButton{
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          border-radius: 6px;
          background-color: #F22128;
          width: 100%;
          color:var(--primary);
          font-size: 16px;
          padding: 12px;
        }
      }
    }
}
`;