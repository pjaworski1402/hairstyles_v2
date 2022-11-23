import styled from "styled-components";
import { device } from "../../styles/device";

export const Container = styled.div`
.searchMobile{
    position: fixed;
    width: 100%;
    z-index: 1;
    background-color: #fff;
    padding: 12px 25px;
    transition: top 0.4s ease-out;
    &.show {
    top: 59px;
    }
    &.hidden {
    top: -80px;
    }
    @media ${device.tablet} {
        display: none;
    }
}
`;

export const Content = styled.div``;
