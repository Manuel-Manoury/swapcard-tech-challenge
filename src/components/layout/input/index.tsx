import styled from "styled-components";

import { BorderRadius, Colors, Spacing } from "../../../styles/variables";

const Input = styled.input`
  border: 1px solid ${Colors.darkgrey};
  color: ${Colors.blackish};
  border-radius: ${BorderRadius.button}px;
  padding: ${Spacing.s}px ${Spacing.m}px;
  font-size: 1.2rem;

  &:disabled {
    background-color: ${Colors.lightgrey};
  }
`;

export default Input;