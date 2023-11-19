import styled from "styled-components";
import { device } from "../device";

export const Container = styled.div`
  .main {
    @media ${device.tablet} {
      display: flex;
      gap: 64px;
      margin-top: 64px;
    }
    .filtersContainer {
      display: none;
      @media ${device.tablet} {
        display: block;
        width: fit-content;
        height: fit-content;
      }
    }
    .offersWrapper {
      width: 100%;
    }
  }
`;

export const MobileSlider = styled.div`
  max-height: 128px;
  @media ${device.tablet} {
    display: none;
  }
`;

export const DesktopSlider = styled.div`
  display: none;
  @media ${device.tablet} {
    display: initial;
  }
`;

export const Offers = styled.div`
  @media ${device.tablet} {
    margin: 0 !important;
    padding: 0 !important;
  }
  .searchContainer {
    display: none;
    @media ${device.tablet} {
      margin-bottom: 16px;
      display: flex;
    }
  }
  .resultsInfo {
    color: #171a1f;
    margin-bottom: 32px;
    font-size: 16px;
    margin-top: 32px;
    display: flex;
    justify-content:space-between;
    @media ${device.tablet} {
      margin-top: 0;
      font-size: 14px;
    }
    .resultsCounter {
    }
    .resultsSortWrapper{
      display: flex;
      align-items: center;
      gap: 6px;
      .resultsSortText{
        font-size: 14px; 
        color: #9095A0;
      }
    }
  }
  .offerWrapper {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  .pagination {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 40px;
    width: 100%;
    justify-content: center;
    .pageWrapper {
      color: #9095a0;
      border-radius: 18px;
      border: 1px solid #dee1e6;
      padding: 6px 12px;
      &.current {
        background: #2082eb;
        color: white;
      }
    }
  }
`;
