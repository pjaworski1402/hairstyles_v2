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
  padding: 16px 0;
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
  .voucherMobile{
    @media ${device.tablet} {
    display: none;
  }
    .totalPriceTitle{
        font-size: 14px; 
  font-weight: 400; 
  line-height: 22px; 
  color: #323842
      }
      .totalPrice{
        border:none;
        padding-top:6px;
      }
    .inputVoucherWrapper{
      width: 100%;
      margin-right: 16px;
    }
    .voucherStatus{
              position: absolute;
              font-size: 12px; 
              font-weight: 700; 
              line-height: 18px; 
              color: #1DD75BFF;
              &.incorrect{
                color:#F22128;
              }
            }
  }
  .priceDesc, .priceDescMobile{
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 8px;
    .priceDescElement{
      display:flex;
      justify-content:space-between;
    }
  }
  .priceDescMobile{
    @media ${device.tablet} {
      display: none;
    }
  }
  .totalPrice {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
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
        .priceDesc{
          display:flex;
          flex-direction:column;
          gap:8px;
          margin-bottom:8px;
          .priceDescElement{
            display:flex;
            justify-content:space-between;
          }
        }
        .totalPriceTitle {
          font-size: 18px;
          margin-bottom: 14px;
        }
        .priceText {
      font-size: 15px;
      color: #323842;
    }
        .totalPriceDesktop {
          display: flex;
          align-items:center;
          justify-content: space-between;
          border-top: 1px solid #dee1e6;
          padding-top: 14px;
          .priceValueTotal {
            font-size: 18px; 
            font-weight: 700; 
            line-height: 28px; 
            color: #2082EB;
          }
          .inputVoucherWrapper{
            width: 100%;
            margin-right: 16px;
            .voucherStatus{
              position: absolute;
              font-size: 12px; 
              font-weight: 700; 
              line-height: 18px; 
              color: #1DD75BFF;
              &.incorrect{
                color:#F22128;
              }
            }
          }
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

export const InputVoucher = styled.input`
  @media ${device.tablet} {
    padding:12px;
  }
  border-radius: 6px;
  outline: none;
  font-size: 14px;
  font-weight: 400; 
  line-height: 22px; 
  padding:6px;
  width: 100%;
  text-transform:uppercase;
  border: ${({ isCorrect }) => isCorrect ? "1px solid #41B029" : "1px solid #9095A0"};
`

export const ButtonVoucher = styled.button`
  @media ${device.tablet} {
    height: 48px;
    width: 98px;
  }
  color: #41B029;
  background: #F3FCF0;
  padding: 12px; 
  height: 36px;
  width: 62px;
  border-radius: 6px;
`