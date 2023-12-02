import styled from "styled-components";
import { device } from "../../styles/device";

export const Container = styled.div`
  background: #f3f4f6;
  padding: 0 12px;
  border-radius: 6px;
  border-width: 0px;
  align-items: center;
  height: 36px;
  display: flex;
  width: calc(100% - (36px + 12px));
  position: relative;
  .hints {
    position: absolute;
    z-index: 1;
    top: 36px;
    left: 0;
    width: 100%;
    list-style: none;
    padding: 0 12px;
    padding: 12px;
    background-color: var(--primary);
    border-radius: 0 0 5px 5px;
    overflow-y:auto;
    max-height: 200px;
    &.hidden {
      display: none;
    }
    &.show {
      display: block;
    }
    .hint {
      padding: 6px 18px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      cursor: pointer;
      :hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
      :first-child {
        border-top: none;
      }
    }
  }
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Input = styled.input`
  margin-left: 4px;
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 14px;
  line-height: 16px;
  width: 100%;
`;
