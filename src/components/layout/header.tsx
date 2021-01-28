import styled from 'styled-components';

import Container from './container';

const Header = styled.header`
  background-color: deeppink;
  min-height: 80px;
  font-size: 32px;
  font-weight: 900;
`;

const StyledHeader = ({ children }) => {
  return (
    <Header>
      <Container>
        {children}
      </Container>
    </Header>
  )
}

export default StyledHeader;