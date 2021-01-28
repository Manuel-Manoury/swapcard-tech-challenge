import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 16px 32px;
`;

export const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Vertical = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Container;