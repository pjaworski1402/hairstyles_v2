import styled from "styled-components";
import { device } from "../../styles/device";

export const Container = styled.div`
  border-radius: 6px;
  border: 1px solid #bcc1ca;

  @media ${device.mobileL} {
    max-width: 164px;
  }
  @media ${device.tablet} {
    max-width: 277px;
  }
  :hover {
    border-color: #41b029;
  }
  .imageWrapper {
    position: relative;
    @media ${device.mobileL} {
      width: 162px;
      height: 128px;
    }
    @media ${device.tablet} {
      width: 275px;
      height: 192px;
    }
    span,
    img {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover;
      border-radius: 6px 6px 0 0;
    }
  }
  .offerWrapper {
    margin: 8px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    .offerTitle {
      margin-top: 6px;
      font-size: 20px;
      @media ${device.mobileL} {
        font-size: 14px;
      }
      @media ${device.tablet} {
        font-size: 20px;
      }
    }
    .tags {
      color: #9095a0;
      font-size: 12px;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100%;
      overflow: hidden;
      height: 14.4px;
      @media ${device.tablet} {
        font-size: 14px;
        height: 18px;
      }
    }
    .description {
      display: none;
      @media ${device.tablet} {
        display: block;
        max-width: 100%;
        overflow: hidden;
        font-size: 12px;
        color: #9095a0;
        height: 30px;
      }
    }
    .priceWrapper {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: bold;
      .price {
        font-size: 20px;
        color: #171a1f;
        @media ${device.mobileL} {
          font-size: 16px;
        }
        @media ${device.tablet} {
          font-size: 24px;
        }
      }
      .oldPrice {
        color: #9095a0;
        text-decoration: line-through;
        font-style: italic;
          font-size: 16px;
        @media ${device.mobileL} {
          font-size: 12px;
        }
        @media ${device.tablet} {
          font-size: 18px;
        }
      }
      .addToCartButton {
        display: none;
        @media ${device.tablet} {
          border-radius: 50%;
          border: 1px solid #2082eb;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: auto;
          transition: 0.2s background-color;
          :hover {
            background-color: #2082eb;
          }
          :hover img {
            filter: brightness(0) invert(1);
          }
        }
      }
    }
  }
`;
