import styled from "styled-components";
import { device } from "../../styles/device";

export const Container = styled.div`
  display: flex;
  gap: 20px;
  border-bottom: 1px solid #f3f4f6;
  @media ${device.tablet} {
    border: ${({ isDiscount }) => isDiscount ? "1px solid #41B029" : "1px solid #f3f4f6"};
    padding-right: 16px;
    border-radius: 6px;
  }
  :last-child {
    border: none;
    @media ${device.tablet} {
      border: ${({ isDiscount }) => isDiscount ? "1px solid #41B029" : "1px solid #f3f4f6"};
      padding-right: 16px;
      border-radius: 6px;
    }
  }
  .thumbnail {
    width: 120px;
    height: 95px;
    position: relative;
    @media ${device.tablet} {
      width: 124px;
      height: 78px;
    }
    img,
    span {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover;
      border-radius: 8px;
    }
  }
  .info {
    flex: 1;
    margin: 14px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 14px;
      color: #323842;
    }
    .tags {
      font-size: 11px;
      color: #9095a0;
      /* text-overflow: ellipsis; */
      /* white-space: nowrap; */
      max-width: 100%;
      overflow: hidden;
    }
    .price {
      font-size: 16px;
      color: #323842;
      .oldPrice{
          font-size:13px;
          color:red;
          text-decoration:line-through;
        }
      @media ${device.tablet} {
        display: none;
      }
    }
  }
  .endWrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 14px 0;
    @media ${device.tablet} {
      display: flex;
      justify-content: center;
      flex-direction: row;
      align-items: center;
      gap: 32px;
    }
    .priceDesktop {
      display: none;
      @media ${device.tablet} {
        display: block;
        .oldPrice{
          font-size:13px;
          color:red;
          text-decoration:line-through;
        }
      }
    }
    .quantity {
      @media ${device.tablet} {
        display: none;
      }
      font-size: 14px;
      color: #171a1f;
    }
  }
`;
