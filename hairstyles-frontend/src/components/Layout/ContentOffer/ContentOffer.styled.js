import styled from "styled-components";
import { device } from "../../../styles/device";

export const Container = styled.div`
  width: 100%;
  /* padding: 0 24px; */
  background-color: var(--primary);
  position: relative;
  z-index: 1;
  ::before {
    @media ${device.tablet} {
      display: none;
    }
    content: "";
    position: absolute;
    width: 100%;
    height: 24px;
    border-radius: 12px 12px 0px 0px;
    top: -24px;
    left: 0;
    background-color: var(--primary);
  }
  .productHeader {
    @media ${device.tablet} {
      display: none;
    }
    .topHeader {
      .title {
        font-size: 20px;
      }
    }
    .bottomHeader {
      display: flex;
      justify-content: space-between;
      .priceWrapper {
        display: flex;
        align-self: flex-end;
        gap: 4px;
        .price {
          font-size: 20px;
          color: #171a1f;
          @media ${device.tablet} {
            font-size: 24px;
          }
        }
        .oldPrice {
          font-size: 14px;
          color: #9095a0;
          text-decoration: line-through;
          font-style: italic;
          align-self: flex-end;
          @media ${device.tablet} {
            font-size: 18px;
          }
        }
      }
      .tags {
        display: flex;
        gap: 5px;
        flex-basis: 50%;
        flex-wrap: wrap;
        .tag {
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background-color: var(--contrast);
          color: var(--primary);
          padding: 4px;
        }
      }
    }
  }
  .tabs {
    margin-top: 32px;
    display: flex;
    align-items: center;
    .tab {
      @media ${device.tablet} {
        font-size: 16px;
        flex: 0 0 140px;
      }
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      white-space: nowrap;
      padding: 14px 0;
      flex: 1;
      font-size: 12px;
      &.active {
        color: var(--contrast);
        border-bottom: 3px solid var(--contrast);
      }
    }
  }
  .content {
    margin-top: 12px;
    margin-bottom: 84px;
    .description {
      font-size: 14px;
      color: #9095a0;
      margin-bottom: 12px;
      white-space: pre-wrap;
    }
  }
  .bottomWrapper {
    @media ${device.tablet} {
      display: none;
    }
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: var(--primary);
    padding: 20px;
    .addToCartButton {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      border-radius: 6px;
      background-color: var(--contrast);
      width: 100%;
      padding: 12px 0;
      color: var(--primary);
      font-size: 16px;
    }
    .removeFromCartButton {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      border-radius: 6px;
      background-color: #f22128;
      width: 100%;
      color: var(--primary);
      font-size: 16px;
      padding: 12px;
    }
  }
`;
