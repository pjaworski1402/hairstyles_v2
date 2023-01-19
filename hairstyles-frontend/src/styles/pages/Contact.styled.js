import styled from 'styled-components';
import { device } from '../device';

export const Container = styled.div`
    margin-top: 64px;
    @media ${device.tablet} {
        margin-top: 32px;
    }
    .title{
            font-size: 32px; 
            margin-bottom: 22px;
            text-align: center;
    }
    .subtitle{
            font-size: 22px; 
            margin-bottom: 22px;
            text-align: center;
    }
    .text{
            font-size: 18px;
            border-bottom: 1px solid #BCC1CA;
            padding-bottom: 22px;
            margin-bottom: 22px;
            text-align: center;
    }
    .mediaWrapper{
            display: flex;
            justify-content: center;
            gap:16px;
            text-align: center;
            @media ${device.tablet} {
                gap: 32px;
            }
    }
    .text2{
            font-size: 18px;
            margin: 22px;
            font-weight: 600;
            text-align: center;
    }
    .form{
        @media ${device.tablet} {
            width: 50%;
        }
        width: 100%;
        border-radius: 6px;
        border: 1px solid #2082EB;
        padding: 32px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap:32px;
        .label{
            .labelText{
                font-size: 18px;
                font-weight: 600;
            }
            .input{
                height: 32px;
                padding: 0 12px;
                border-radius: 6px;
                border:1px solid #BCC1CA;
                margin-top: 12px;
                width: 100%;
                @media ${device.tablet} {
                    width: 50%;
                }
            }
            textarea.input{
                line-height: 1.5;
                resize: none;
                padding: 12px;
                height: 76px;
                width: 100%;
            }
            .messageLength{
                font-size: 12px;
                text-align: right;
                &.red{
                    color:red;
                }
            }
        }
        .sendButton{
            padding: 12px 32px;
            border-radius: 6px;
            background-color: var(--contrast);
            color:white;
            width: min-content;
        }
    }
`;