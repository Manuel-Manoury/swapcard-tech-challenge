import styled from "styled-components";

export const ContentContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: auto;
  padding: 16px 32px;

  @media (max-width: 767px) {
    padding: 16px 20px;
    height: 100%;
  }
`;

export const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Vertical = styled.div`
  display: flex;
  flex-direction: column;
`;
