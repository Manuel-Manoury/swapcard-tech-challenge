import styled from "styled-components";

import Input from ".";
import { Cross, Magnifier } from "../../icons";
import { Horizontal, Vertical } from "../container";

const SearchInputContainer = styled(Vertical)`
  margin-bottom: 32px;
  
  h3 {
    margin: 0;
    margin-bottom: 16px;
  }
`;

const IconContainer = styled(Vertical)`
  align-items: center;
`;

const InputContainer = styled(Horizontal)`
  align-items: center;
  background-color: #FFFFFF;
  border-radius: 4px ;
  border: 1px solid #CCCCCC;
  padding: 0 16px;
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
  onChange: (e: any) => void;
  placeholder: string;
  clearInput: () => void;
};

const SearchInput : React.FC<SearchInputType> = ({ type, value, onChange, placeholder, clearInput }) => {
  return (
    <SearchInputContainer>
      <h3>
        Search
      </h3>
      <InputContainer>
        <Magnifier />
        <Input type={type} value={value} onChange={onChange} placeholder={placeholder} />
        <IconContainer onClick={clearInput}>
          <Cross />
        </IconContainer>
      </InputContainer>
    </SearchInputContainer>
  );
};

export default SearchInput;