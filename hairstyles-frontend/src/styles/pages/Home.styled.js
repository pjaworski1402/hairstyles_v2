import styled from "styled-components";
import { device } from "../device";

export const Container = styled.div``;

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
    border-top: 1px solid #BCC1CA;
    margin-top: 22px;
    :first-child{
      padding-top: 0;
      border-top: none;
      margin-top: 0;
    }
    @media ${device.tablet} {
      font-size: 54px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
  }
  .showMoreBottom{
      width: 100%;
      color:white;
      background: #2082EB;
      font-size: 14px;
      display: flex; 
      align-items: center; 
      justify-content: center;
      padding: 12px;
      border-radius: 4px;
      margin-top: 32px;
      img{
        margin-right: 12px;
      }
      @media ${device.tablet} {
        display: none;
      }
    }
  .showMoreTop {
    display: none;
    @media ${device.tablet} {
      display: block;
      font-size: 14px; 
      color: #2082EB;
      text-decoration: underline;
    }

  }
  .offerWrapper {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}
`;
