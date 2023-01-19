import styled from 'styled-components';
import { device } from "../../styles/device"

export const Container = styled.div`
    margin-top: 64px;
    display: flex;
    align-items: center;
    flex-direction: column;
    @media ${device.tablet} {
        margin-top: 32px;
    }
    .failedIcon {
        background: #F22128;
        width: 74px;
        height: 74px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 32px;
        margin-top: 32px;
        @media ${device.tablet} {
            width: 150px;
            height: 150px;
            img{
                width: 110px!important;
                height: 110px!important;
            }
        }
    }
    .orderFailed {
        color: var(--contrast);
        margin-bottom: 24px;
        text-align: center;
        font-size: 20px; 
        @media ${device.tablet} {
            font-size: 32px; 
        }
    }
    .orderStatus {
        text-align: center;
        color:#9095A0;
        font-size: 14px; 
        @media ${device.tablet} {
            font-size: 16px; 
        }
    }
    .buttonWrapper{
        width: 100%;
        display: flex;
        gap:32px;
        justify-content: center;
            .navButton{
                background-color: var(--contrast);
                color: white;
                padding: 12px 16px;
                border-radius: 6px;
                width: 100%;
                margin-top: 32px;
                font-size: 16px; 
                @media ${device.tablet} {
                    width: max-content;
                }
                .navButtonWrapper{
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    justify-content: center;
                }
            }
        }
`;