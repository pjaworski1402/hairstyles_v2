import Image from "next/image";
import React from "react";
import styled from 'styled-components';
import checkIco from "../../static/icons/check-icon.svg"
const path = require("path");
const staticPath = path.resolve(__dirname, "..", "static")

export const Container = styled.div`
    width: 16px;
    height: 16px;
    border: 1px solid #565E6C;
    border-radius: 3px;
    cursor: pointer;
    position: relative;
    background-color: ${({ checked }) => checked ? "#2082EB" : "white"};
    .checked {
        display:${({ checked }) => checked ? "block" : "none"};
        position: absolute;
        top:10%;
        left:10%;
        width: 80%;
        height: 80%;
    }
    .children{
        position: absolute;
        width: max-content;
        left: calc(100% + 6px);
        top: -1px;
    }
`;

const Checkbox = (props) => {
    return (
        <Container {...props}>
            <svg className="checked" width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4L4 7L9 1" stroke="white" strokeWidth="2" />
            </svg>
            <div className="children">
                {props.children}
            </div>
        </Container>
    );
}

export default Checkbox;