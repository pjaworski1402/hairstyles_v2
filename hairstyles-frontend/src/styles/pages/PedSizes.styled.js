import styled from 'styled-components';
import { device } from '../device';

export const Container = styled.div`
  text-align: center;
  margin-top: 64px;
  @media ${device.tablet} {
  margin-top: 32px;
  }
  .title{
    font-size: 54px;
  }
  .description{
    font-size: 20px;
    color: #171A1F;
    margin-bottom: 42px;
    p{
        margin-bottom: 6px;
    }
    .warning{
        font-weight: 600;
        .red{
            color: red;
        }
    }
  }
`;