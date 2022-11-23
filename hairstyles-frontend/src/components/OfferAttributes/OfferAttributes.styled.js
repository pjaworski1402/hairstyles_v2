import styled from 'styled-components';
import { device } from '../../styles/device';

export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    flex-direction: column;
    @media ${device.tablet} {
    flex-direction: row;
    gap: 6px;
    }
    .attribute{
        @media ${device.tablet} {
            flex-basis: calc(50% - 12px);
        }
        .attributeTitle{

        }
        .attributeWrapper{
            display: flex;
            align-items: center;
            gap:6px;
            text-transform: capitalize;
        }
    }
`;