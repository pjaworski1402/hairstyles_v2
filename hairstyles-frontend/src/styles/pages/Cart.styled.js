import styled from "styled-components";
import { device } from "../device";

export const Container = styled.div`
  position: relative;
  margin-top: 60px;
  @media ${device.tablet} {
    display: flex;
    flex-wrap: wrap;
  }
  .cartTitle {
    margin-bottom: 16px;
    font-size: 24px;
    @media ${device.tablet} {
      flex-basis: 100%;
      font-size: 28px;
      margin-bottom: 32px;
    }
  }
  .productsWrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
    @media ${device.tablet} {
      gap: 12px;
      flex-basis: 50%;
    }
  }
`;

export const BottomWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 36px 0;
  background-color: white;
  z-index: 1;
  @media ${device.tablet} {
    position: relative;
    flex-basis: 40%;
    border-radius: 6px;
    border: 1px solid #dee1e6;
    margin-left: auto;
    height: fit-content;
  }
  .totalPrice {
    display: flex;
    justify-content: space-between;
    margin-bottom: 28px;
    border-top: 1px solid #dee1e6;
    padding-top: 12px;
    @media ${device.tablet} {
      display: none;
    }
    .priceText {
      font-size: 14px;
      color: #323842;
    }
    .priceValue {
      font-size: 20px;
      color: #2082eb;
    }
  }
  .summaryDesktop {
    display: none;
    @media ${device.tablet} {
      display: flex;
      flex-direction: column;
      .paymentMethod {
        .paymentWrapper {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
        }
        .paymentMethodTitle {
          font-size: 18px;
          margin-bottom: 14px;
        }
      }
      .summaryTotalPrice {
        margin-top: 32px;
        .totalPriceTitle {
          font-size: 18px;
          margin-bottom: 14px;
        }
        .totalPriceDesktop {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid #dee1e6;
          padding-top: 14px;
        }
      }
    }
  }
  .nextButton {
    border-radius: 6px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    background-color: var(--contrast);
    color: var(--primary);
    gap: 6px;
    @media ${device.tablet} {
      margin-top: 14px;
    }
  }
`;
