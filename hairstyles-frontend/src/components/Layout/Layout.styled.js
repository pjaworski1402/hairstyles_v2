import styled from "styled-components";
import { device } from "../../styles/device";

export const Container = styled.div`
    position: relative;
    .filtersButton{
        background-color: var(--contrast);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 6px;
        width: 36px;
    }
    .searchMobile{
        position: sticky;
        width: 100%;
        z-index: 1;
        background-color: #fff;
        padding: 12px 25px;
        transition: top 0.4s ease-out;
        display: flex;
        gap: 12px;
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
    .footer{
        margin-top: 64px;
    }
`;

export const CartButton = styled.div`
    position: fixed;
    display: flex;
    align-items:center;
    justify-content:center;
    padding: 16px;
    box-shadow: 0px 8px 17px #565e6c, 0px 0px 2px #565e6c;
    background-color: white;
    z-index:999;
    bottom: 32px;
    right: 12px;
    border-radius:50%;
    width: 64px;
    height: 64px;
    .cartWrapper{
        height: 32px;
        .lengthCart{
        position: absolute;
        bottom: 0px;
        right: 0px;
        color:white;
        background-color: rgb(39, 83, 255);
        display:fixed;
        align-items:center;
        justify-content:center;
        width: 24px;
        height: 24px;
        border-radius:50%;
        font-size:12px;
    }
    }

    @media ${device.tablet} {
            display: none;
        }
`

export const Content = styled.div``;
