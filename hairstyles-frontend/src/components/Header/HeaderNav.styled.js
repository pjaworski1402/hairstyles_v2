import styled from "styled-components";
import { device } from "../../styles/device";
import Search from "../../elements/Search/Search";

export const Container = styled.nav`
  position: relative;
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--primary);
`;

export const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  padding-bottom: 12px;
  @media ${device.tablet} {
    justify-content: flex-start;
    .cartMobile{
      display: none;
    }
  }
`;

export const Logo = styled.div`
  a {
    display: flex;
    align-items: center;
  }
`;

export const MenuButton = styled.button`
  width: 24px;
  height: 24px;
  img,
  span {
    width: 100%;
    height: 100%;
  }
  @media ${device.tablet} {
    display: none;
  }
`;

export const SiteName = styled.span`
  font-size: 18px;
  margin-left: 8px;
`;

export const DesktopNav = styled.ul`
  @media ${device.tablet} {
    display: flex;
    justify-self: start;
    color: #565e6c;
    font-size: 14px;
    line-height: 22px;
    list-style: none;
    margin-left: 18px;
    li {
      margin-right: 16px;
      &.active {
        color: #2082eb !important;
        font-weight: 600;
        position: relative;
        :after {
          content: "";
          position: absolute;
          left: -6px;
          bottom: -19px;
          height: 4px;
          width: calc(100% + 12px);
          background-color: #2082eb;
          border-radius: 2px 2px 0px 0px;
        }
      }
    }
  }
  @media ${device.laptopL} {
    margin-left: 32px;
    li {
      margin-right: 24px;
    }
  }
  display: none;
`;
export const DesktopRight = styled.div`
  display: none;
  @media ${device.tablet} {
    margin-left: auto;
    display: flex;
    a {
      display: flex;
      align-items: center;
      margin-left: 18px;
    }
    .cartLength {
      position: relative;
      .cartLengthValue {
        position: absolute;
        top: -10px;
        right: -10px;
        background-color: var(--contrast);
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        color: white;
        font-size: 10px;
        font-weight: bold;
      }
    }
  }
`;
export const SearchWrapper = styled.div`
  display: none;
  width: 180px;
  @media ${device.laptopL} {
    width: 300px;
  }
  @media ${device.laptop} {
    display: flex;
  }
`;
