import styled from "styled-components";

import { Colors } from "../../../styles/variables";

import { ContentContainer } from "../container";

export const HEADER_HEIGHT = 80;

const Header = styled.header`
  background-color: ${Colors.blackish};
  height: ${HEADER_HEIGHT}px;
  min-height: ${HEADER_HEIGHT}px;
  font-size: 32px;
  font-weight: 800;

  a {
    color: ${Colors.whitish};
    text-decoration: none;
  }

  ${ContentContainer} {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const StyledHeader : React.FC<{}> = ({ children }) => (
  <Header>
    <ContentContainer>
      {children}
    </ContentContainer>
  </Header>
);

export default StyledHeader;