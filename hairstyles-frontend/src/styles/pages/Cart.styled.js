import styled from 'styled-components';

export const Container = styled.div`
  position:relative;
  margin-top: 60px;
  padding: 0 25px;
  .cartTitle{
    margin-bottom: 16px;
  }
  .productsWrapper{
    display: flex;
    flex-direction: column;
    gap:5px;
  }
`;

export const BottomWrapper = styled.div`
  position: fixed;
  bottom:0;
  left:0;
  width: 100%;
  padding: 36px 0;
  .nextButton{
    width: 90%;
    margin:0 auto;
    border-radius: 6px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    background-color: var(--contrast);
    color: var(--primary);
  }
`;