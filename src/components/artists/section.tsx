import { useState } from "react";
import styled, { css } from "styled-components";

import { Colors, Spacing } from "../../styles/variables";

import { Sort } from "../icons";
import { Horizontal } from "../layout/container";

const SectionTitleContainer = styled(Horizontal)`
  position: relative;
  align-items: center;
  
  svg {
    position: absolute;
    right: ${Spacing.m}px;
  }
`;

const SectionTitle = styled.h2`
  background-color: ${Colors.darkgrey};
  padding: ${Spacing.xs}px ${Spacing.m}px;
  margin: ${Spacing.none};
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`;

type SectionContentType = {
  isCollapsed: boolean;
};

const SectionContent = styled.div<SectionContentType>`
  max-height: 1000%;
  transition: 500ms max-height ease-in-out;
  margin-bottom: ${Spacing.m}px;
  border: 1px solid ${Colors.darkgrey};
  flex-shrink: 0;

  ${({ isCollapsed }) => isCollapsed && css`
    overflow: hidden;
    max-height: ${Spacing.none};
    padding: ${Spacing.none};
  `};
`;

type ArtistSectionType = {
  title: string;
  collapsed?: boolean;
  children: JSX.Element;
};

const ArtistSection : React.FC<ArtistSectionType> = ({ title, children, collapsed = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const handleToggleCollapsed = () => setIsCollapsed(!isCollapsed);

  return (
    <>
      <SectionTitleContainer onClick={handleToggleCollapsed}>
        <SectionTitle>
          {title}
        </SectionTitle>
        <Sort rotation={isCollapsed ? 0 : -180} />
      </SectionTitleContainer>
      <SectionContent isCollapsed={isCollapsed}>
        {children}
      </SectionContent>
    </>
  );
};

export default ArtistSection;