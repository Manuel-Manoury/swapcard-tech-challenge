import styled from "styled-components";

import { Breakpoints, Colors, CONTENT_MAX_WIDTH, Spacing } from "../../../styles/variables";

import { Vertical } from "../container";

import { HEADER_HEIGHT } from '../header';

export const PageLayout = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  max-height: calc(100% - ${HEADER_HEIGHT}px);

  &:before {
    background-color: ${Colors.darkgrey};
    content: "";
    display: flex;
    flex: 1 1 auto;
  }

  &:after {
    content: "";
    display: flex;
    flex: 1 1 auto;
  }
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  max-width: ${CONTENT_MAX_WIDTH}px;
  width: 100%;
  overflow: hidden;
`;

export const PageContent = styled(Vertical)`
  padding: ${Spacing.xl}px;
  height: 100%;
  width: 100%;
  background-color: ${Colors.whitish};

  @media (max-width: ${Breakpoints.mobileMaxWidth}px) {
    padding: ${Spacing.l}px;
  }
`;