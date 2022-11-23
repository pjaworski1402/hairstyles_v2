import styled from "styled-components";
import { device } from "../../../styles/device";

export const Container = styled.nav`
  position: fixed;
  background-color: var(--primary);
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  z-index: 999;
  @media ${device.tablet} {
    display: none;
  }
`;
export const Wrapper = styled.ul`
  border-top: 1px solid var(--gray);
`;
export const Element = styled.li`
  padding: 16px 25px;
  text-transform: capitalize;
  a {
    display: flex;
    align-items: center;
  }
`;
export const SubMenu = styled.ul``;
export const SubElement = styled.li`
  padding: 16px 33px;
  text-transform: capitalize;
  display: flex;
  align-items: center;
`;
export const Icon = styled.span`
  margin-right: 12px;
`;
export const DropDownIco = styled.div`
  margin-left: auto;
`;
