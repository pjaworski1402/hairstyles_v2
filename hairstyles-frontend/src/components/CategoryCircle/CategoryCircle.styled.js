import styled from "styled-components";
import { device } from "../../styles/device";

export const Container = styled.div`
  width: 40%;
  aspect-ratio: 1/1;
  @media ${device.tablet} {
    width: 20%;
  }
  border-radius: 50%;
  border: 1px solid #bcc1ca;
  background-color: #f3f4f6;
  transition: 0.2s;
  transition-property: background-color, color;
  :hover {
    background-color: var(--contrast);
    color: white;
    ::before {
      border-color: var(--contrast);
    }
  }
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  a {
    width: 100%;
    height: 100%;
    position: relative;
  }
  ::before {
    content: "";
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    border: 1px solid #bcc1ca;
    position: absolute;
    left: -8px;
    bottom: -6px;
    z-index: -1;
    @media ${device.tablet} {
      left: -18px;
      bottom: -12px;
    }
  }
  .title {
    position: absolute;
    bottom: 15px;
    font-size: 16px;
    left: 50%;
    transform: translateX(-50%);
    @media ${device.tablet} {
      font-size: 32px;
      font-weight: 600;
      bottom: 36px;
    }
  }
  .imageWrapper {
    position: absolute;
    bottom: 34px;
    @media ${device.tablet} {
      bottom: 75px;
    }
    span,
    img {
    }
  }
`;
