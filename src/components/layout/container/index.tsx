import styled from "styled-components";

import { Breakpoints, CONTENT_MAX_WIDTH, Spacing } from "../../../styles/variables";

export const ContentContainer = styled.div`
  max-width: ${CONTENT_MAX_WIDTH}px;
  width: 100%;
  margin: auto;
  padding: ${Spacing.m}px ${Spacing.xl}px;

  @media (max-width: ${Breakpoints.mobileMaxWidth}px) {
    padding: ${Spacing.m}px ${2.5 * Spacing.s}px;
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
