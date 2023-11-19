import styled from "styled-components";
import { device } from "../../styles/device";

export const ContainerHorizontal = styled.div`
  border-bottom: 1px solid #bcc1ca;
  :last-of-type {
    border-bottom: none;
    @media ${device.tablet} {
      border: 1px solid #f3f4f6;
    }
  }
  @media ${device.tablet} {
    border: 1px solid #f3f4f6;
    border-radius: 6px;
    border: 1px solid ${({ isInCart }) => (isInCart ? "#3c9f25" : "#f3f4f6")};
    :hover {
      border: 1px solid ${({ isInCart }) => (isInCart ? "#3c9f25" : "#2082eb")};
    }
  }
  width: 100%;
  padding-bottom: 5px;
  a {
    display: flex;
    gap: 24px;
    :hover {
      border-color: #41b029;
    }
    .imageWrapper {
      position: relative;
      @media ${device.tablet} {
        width: 246px;
        height: 176px;
      }
      width: 119px;
      height: 94px;
      span,
      img {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover;
        border-radius: 6px;
      }
    }
    .offerWrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 12px;
      flex-basis: calc(100% - (119px + 24px + 12px));
      @media ${device.tablet} {
        flex-basis: calc(100% - (246px + 24px + 12px));
      }
      .offerTitle {
        font-size: 14px;
        @media ${device.tablet} {
          font-size: 20px;
        }
      }
      .tags {
        color: #9095a0;
        font-size: 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
        overflow: hidden;
        height: 12px;
        text-transform: capitalize;
        @media ${device.tablet} {
          font-size: 14px;
          height: 18px;
        }
      }
      .description {
        display: none;
        @media ${device.tablet} {
          /* display: block; */
          max-width: 100%;
          overflow: hidden;
          font-size: 12px;
          color: #323842;
          /* height: 30px; */
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          white-space: pre-wrap;
        }
      }
      .priceWrapper {
        display: flex;
        align-items: center;
        gap: 6px;
        font-weight: bold;
        .price {
          font-size: 16px;
          color: #171a1f;
          @media ${device.tablet} {
            font-size: 24px;
          }
        }
        .oldPrice {
          font-size: 12px;
          color: #9095a0;
          text-decoration: line-through;
          font-style: italic;
          @media ${device.tablet} {
            font-size: 18px;
          }
        }
        .addToCartButton {
          border-radius: 50%;
          border: 1px solid #2082eb;
          width: 24px;
          height: 24px;
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
          @media ${device.tablet} {
            display: none;
          }
        }
        .addToCartButtonDesktop {
          display: none;
          @media ${device.tablet} {
            background-color: #2082eb;
            color: white;
            padding: 12px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: auto;
            img,
            span {
              margin-right: 2px !important;
            }
          }
        }
        .addedToCartButton {
          border-radius: 50%;
          background-color: #41b029;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: auto;
          :hover {
            background-color: #30821d;
          }
          :hover img {
            filter: brightness(0) invert(1);
          }
          @media ${device.tablet} {
            display: none;
          }
        }
        .addedToCartButtonDesktop {
          display: none;
          @media ${device.tablet} {
            background-color: #41b029;
            color: white;
            padding: 12px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: auto;
            img,
            span {
              margin-right: 2px !important;
            }
          }
        }
      }
    }
  }
`;
