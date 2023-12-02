import styled from "styled-components";
import { device } from "../../styles/device";

export const Container = styled.div`
  border-radius: 6px;
  box-shadow: 0px 0px 1px #171a1f, 0px 0px 2px #171a1f;
  padding: 16px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  overflow-y: auto;
  z-index: 200;
  background-color: var(--primary);
  @media ${device.tablet} {
    position: static;
    max-height: unset;
  }
  .header {
    display: flex;
    align-items: center;
    .title {
      font-size: 20px;
      margin: 0 auto;
      padding-left: 24px;
      @media ${device.tablet} {
      font-size: 16px;
      padding-left: 0;
      margin: 0;
      }
    }
    .closeButton {
      justify-self: flex-end;
      @media ${device.tablet} {
        display: none;
      }
    }
  }
  .clearAll {
    color: #f22128;
    font-size: 12px;
    text-align: center;
    width: 100%;
    margin-top: 16px;
    @media ${device.tablet} {
      margin-top: 0px;
      text-align: right;
      margin-top: -16px;
      display: block;
    }
  }
  .filtersWrapper {
    @media ${device.tablet} {
        padding-top: 12px;
        margin-top: 12px;
        border-top: 1px solid #F3F4F6;
      }
    .filters {
      border-bottom: 1px solid #dee1e6;
      margin-bottom: 12px;
      padding-bottom: 12px;
      :last-of-type {
        border-bottom: none;
      }
      .filterTitle {
        font-size: 16px;
        margin-bottom: 12px;
        font-weight: 600;
      }
      .filterSubtitle {
        font-size: 15px;
        text-transform: capitalize;
        margin-bottom: 12px;
        display: flex;
        gap: 6px;
        align-items: center;
      }
      .subFilters {
        display: flex;
        flex-direction: column;
        gap: 12px;
        text-transform: capitalize;
        margin-bottom: 12px;
      }
      .filter {
        font-size: 14px;
        display: flex;
        gap: 6px;
        text-transform: capitalize;
      }
      .filterPrice {
        margin-top: 32px;
      }
    }
    .submitButton{
      gap: 6px;
      border-radius: 6px;
      background: #2082EB;
      color:white;
      width: 100%;
      padding: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      transition: 0.2s background-color;
      :hover{
        background-color: rgb(13,78,147);
      }
    }
  }
`;
