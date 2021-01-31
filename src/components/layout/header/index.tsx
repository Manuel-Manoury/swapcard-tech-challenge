import styled from "styled-components";

import { ContentContainer } from "../container";

const Header = styled.header`
  background-color: #212121;
  height: 80px;
  min-height: 80px;
  font-size: 32px;
  font-weight: 900;

  a {
    color: #F2F2F2;
    text-decoration: none;
  }
`;

const StyledHeader = ({ children }) => {
  return (
    <Header>
      <ContentContainer>
        {children}
      </ContentContainer>
    </Header>
  )
}

export default StyledHeader;