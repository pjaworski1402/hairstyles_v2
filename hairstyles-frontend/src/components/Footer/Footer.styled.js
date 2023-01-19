import styled from 'styled-components';
import { device } from "../../styles/device"

export const Container = styled.footer`
        border-top: 1px solid #DEE1E6;
    .wrapper{
        display: flex;
        align-items: flex-start;
        @media ${device.tablet} {
            align-items: center;
        }
        padding-top: 20px;
        padding-bottom: 20px;
        flex-direction: column;
        .logoWrapper{
            .logo{
                display: flex;
                align-items: center;
                .logoText{
                    font-size: 18px;
                    margin-left: 8px;
                }
            }
        }
        .navWrapper{
            display: flex;
            gap: 32px;
            margin-top: 18px;
            color: #323842;
            flex-direction: column;
            @media ${device.tablet} {
                flex-direction: row;
                gap: 64px;
            }
            .navItem{
                flex: 1;
                .navTitle{
                    font-size: 20px;
                    margin-bottom: 16px;
                }
                .navLinks{
                    display: flex;
                    flex-direction: column;
                    gap:12px;
                    a{
                        font-size: 14px;
                    }
                }
            }
        }
        .copyright{
            font-size: 14px; 
            color: #9095A0;
            margin-top: 24px;
            padding-top: 12px;
            border-top:1px solid #DEE1E6;
            width: 100%;
            text-align: center;
            position: relative;
            .contact{
                @media ${device.tablet} {
                    position: absolute;
                    margin-top: 0;
                }
                justify-content: center;
                margin-top: 12px;
                right: 0;
                top:12px;
                display: flex;
                gap:16px;
            }
        }
    }
`;