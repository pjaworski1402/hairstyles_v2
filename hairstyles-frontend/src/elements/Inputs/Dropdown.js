import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import useOutsideClick from '../../hooks/useOutsideClick';
import arrowDown from "../../static/icons/arrow-down-blue.svg";
import Image from "next/image";

const CustomSelect = styled.div`
  position: relative;
  font-size: 14px; 
`;

const SelectButton = styled.div`
  cursor: pointer;
  color: #2082EB;
  display: flex;
  gap: 2px;
`;

const OptionsContainer = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: max-content;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

const Option = styled.div`
  padding: 10px;
  cursor: pointer;
  font-weight: 500; 
  &:hover {
    background-color: #f0f0f0;
  }
`;

const CustomDropdown = ({ options, onSelect, defaultValue = null }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(defaultValue);
    const dropdownRef = useRef(null);
    const handleSelect = option => {
        setSelectedOption(option);
        onSelect(option);
        setIsOpen(false);
    };

    useOutsideClick(dropdownRef, () => {
        setIsOpen(false);
    });

    return (
        <CustomSelect ref={dropdownRef}>
            <SelectButton onClick={() => setIsOpen(!isOpen)}>
                {selectedOption ? selectedOption.label : 'Select an option'}
                <Image
                    src={arrowDown}
                    width={16}
                    height={16}
                    className="dropDown"
                    alt="dropdown"
                />
            </SelectButton>
            <OptionsContainer isOpen={isOpen}>
                {options.map(option => (
                    <Option key={option.value} onClick={() => handleSelect(option)}>
                        {option.label}
                    </Option>
                ))}
            </OptionsContainer>
        </CustomSelect>
    );
};

export default CustomDropdown;
