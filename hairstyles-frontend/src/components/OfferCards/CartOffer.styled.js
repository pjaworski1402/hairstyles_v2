import styled from 'styled-components';
import { device } from '../../styles/device';

export const Container = styled.div`
  display: flex;
  gap:20px;
  border-bottom: 1px solid #F3F4F6;
  :last-child{
    border:none;
  }
  .thumbnail{
    width: 120px;
    height: 95px;
    position: relative;
    @media ${device.tablet} {
        width: 124px;
        height: 78px;
        }
    img,span{
        width: 100% !important;
        height: 100% !important;
        object-fit: cover;
        border-radius: 8px;
    }
  }
  .info{
    flex:1;
    margin: 14px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title{
        font-size: 14px;
        color: #323842;
    }
    .tags{
        font-size: 11px;
        color: #9095A0;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
        overflow: hidden;
    }
    .price{
        font-size: 16px;
        color: #323842;
        @media ${device.tablet} {
            display: none;
        }
    }
  }
  .endWrapper{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 14px 0;
    @media ${device.tablet} {
            display: flex;
            justify-content: center;
            flex-direction: row;
            align-items: center;
            gap:32px;
        }
    .priceDesktop{
        display: none;
        @media ${device.tablet} {
            display: block;
        }
    }
    .quantity{
        @media ${device.tablet} {
            display:none;
        }
        font-size: 14px;
        color: #171A1F;
    }
  }
`;