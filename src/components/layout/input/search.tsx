import styled from "styled-components";

import { BorderRadius, Colors, Spacing } from "../../../styles/variables";

import Input from ".";
import { Cross, Magnifier } from "../../icons";
import { Horizontal, Vertical } from "../container";

const SearchInputContainer = styled(Vertical)`
  margin-bottom: ${Spacing.xl}px;
  
  h3 {
    margin: ${Spacing.none};
    margin-bottom: ${Spacing.m}px;
  }
`;

const IconContainer = styled(Vertical)`
  align-items: center;
`;

type InputContainerType = {
  disabled: boolean;
};

const InputContainer = styled(Horizontal)<InputContainerType>`
  align-items: center;
  background-color: ${({ disabled }) => disabled ? Colors.lightgrey : Colors.white};
  border-radius: ${BorderRadius.button}px ;
  border: 1px solid ${Colors.darkgrey};
  padding: ${Spacing.none} ${Spacing.m}px;
  height: 48px;

  ${Input} {
    border: none;
    height: 100%;
    width: 100%;

    &:focus {
      outline: none;
    }
  }

  #CrossIcon {
    &:hover {
      cursor: pointer;
    }
  }
`;

type SearchInputType = {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  disabled: boolean;
  clearInput: () => void;
};

const SearchInput : React.FC<SearchInputType> = ({ type, value, onChange, placeholder, clearInput, disabled }) => (
  <SearchInputContainer>
    <h3>
      Search
    </h3>
    <InputContainer disabled={disabled}>
      <Magnifier />
      <Input type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} />
      <IconContainer onClick={clearInput}>
        <Cross />
      </IconContainer>
    </InputContainer>
  </SearchInputContainer>
);

export default SearchInput;