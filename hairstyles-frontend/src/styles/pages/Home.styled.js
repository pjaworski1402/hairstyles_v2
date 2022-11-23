import styled from "styled-components";
import { device } from "../device";

export const Container = styled.div``;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  .content {
    width: 100%;
    @media ${device.tablet} {
      max-width: 1000px;
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
  h3 {
    font-size: 16px;
    color: var(--font);
    margin-bottom: 12px;
    @media ${device.tablet} {
      font-size: 54px;
    }
  }
  .offerWrapper {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}
`;
