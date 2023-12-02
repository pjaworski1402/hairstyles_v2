import styled from "styled-components";
import { device } from "../device";

export const Container = styled.div`
  .searchWrapper {
    display: none;
    @media ${device.tablet} {
      display: block;
      margin-top: 24px;
      .lastUpdateDate{
        font-size: 14px; 
        font-weight: 300; 
        line-height: 22px; 
        color: #9095A0FF;
        margin-bottom:24px;
      }
      .searchContainer {
        width: 100%;
      }
    }
  }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
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

export const Categories = styled.div`
  h3 {
    font-size: 16px;
    color: var(--font);
    margin-bottom: 12px;
    @media ${device.tablet} {
      font-size: 54px;
      margin-bottom: 48px;
    }
  }
  margin: 32px 25px;
  .categoryWrapper {
    display: flex;
    justify-content: space-between;
    gap: 32px;
    flex-wrap: wrap;
  }
`;

export const Offers = styled.div`
  margin: 32px 25px;
  margin-bottom: 0;
  h3 {
    font-size: 22px;
    color: var(--font);
    margin-bottom: 24px;
    padding-top: 12px;
    border-top: 1px solid #bcc1ca;
    margin-top: 22px;
    :first-child {
      padding-top: 0;
      border-top: none;
      margin-top: 0;
    }
    @media ${device.tablet} {
      margin-top: 24px;
      padding-top: 21px;
      font-size: 54px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 42px;
    }
  }
  .showMoreBottom {
    width: 100%;
    color: white;
    background: #2082eb;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    border-radius: 4px;
    margin-top: 32px;
    img {
      margin-right: 12px;
    }
    @media ${device.tablet} {
      /* display: none; */
      width: 270px;
      margin: 0px calc(50% - 135px) 0 calc(50% - 135px);
    }
  }
  .showMoreTop {
    display: none;
    @media ${device.tablet} {
      display: block;
      font-size: 14px;
      color: #2082eb;
      text-decoration: underline;
    }
  }
  .offerWrapper {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    @media ${device.tablet} {
      gap: 32px;
    }
  }
`;
