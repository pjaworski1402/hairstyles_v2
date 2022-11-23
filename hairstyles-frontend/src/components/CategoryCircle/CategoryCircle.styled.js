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
    left: -12px;
    bottom: -12px;
    z-index: -1;
  }
  .title {
    position: absolute;
    bottom: 12px;
    font-size: 16px;
    left: 50%;
    transform: translateX(-50%);
  }
  .imageWrapper {
    position: absolute;
    bottom: 32px;
    span,
    img {
    }
  }
`;
