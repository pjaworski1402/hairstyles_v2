import { device } from "../../styles/device"
import styled, { keyframes } from 'styled-components';

// Definicja animacji obrotu
const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
export const Container = styled.div`
    margin-top: 64px;
    display: flex;
    align-items: center;
    flex-direction: column;
    @media ${device.tablet} {
        margin-top: 32px;
    }
    .loadingIco{
animation: ${rotate360} 2s linear infinite;
    }
    .successIcon {
        background: #17A948;
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
    .orderSuccess {
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
    .summary {
        border-radius: 8px;
        background: #FAFAFB;
        padding: 24px 18px;
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 24px;
        gap:12px;
        @media ${device.tablet} {
            max-width: 560px;
        }
        .summaryRow {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #DEE1E6;
            padding-top: 12px;
            :first-child{
                padding-top: 0px;
                border:none;
            }
            .summaryTitle {
                font-size: 14px;
                color: #565E6C;
                @media ${device.tablet} {
                    font-size: 16px;
                }
            }
            .summaryValue {
                font-size: 16px; 
                color: #171A1F;
                @media ${device.tablet} {
                    font-size: 18px;
                }
            }
        }
        .itemsRow{
            display: flex;
            flex-direction:column;
            justify-content:flex-start;
            align-items:flex-start;
        }
    }
    .backHome{
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
        .backHomeWrapper{
            display: flex;
            align-items: center;
            gap: 8px;
            justify-content: center;
        }
    }
    .itemList{
        width: 100%;
        display:flex;
        flex-direction: column;
        gap:16px;
        .offerWrapper{
            display: flex;
            border-radius: 6px;
            border-width: 1px; 
            border-color: #9095A0;
            border-style: solid;
            width: 100%;
            span, img{
                object-fit:cover;
                border-radius: 6px 0 0 6px;
            }
            .offerInfo{
                display:flex;
                flex-direction:column;
                margin-left: 16px;
                .offerTitle{
                    font-size: 16px; 
                    font-weight: 700; 
                    color: #171A1F;
                    margin-top:20px;
                }
                .offerTags{
                    font-size: 14px; 
                    font-weight: 400; 
                    color: #9095A0;
                    margin-top:3px;
                    text-transform:capitalize;
                }
            }
        }

    }
`;