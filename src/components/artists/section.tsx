import { useState } from "react";
import styled, { css } from "styled-components";

import { Sort } from "../icons";
import { Horizontal } from "../layout/container";

const SectionTitleContainer = styled(Horizontal)`
  position: relative;
  align-items: center;
  
  svg {
    position: absolute;
    right: 16px;
  }
`;

const SectionTitle = styled.h2`
  background-color: #CCCCCC;
  padding: 4px 16px;
  margin: 0;
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
  margin-bottom: 16px;
  border: 1px solid #CCCCCC;
  flex-shrink: 0;

  ${({ isCollapsed }) => isCollapsed && css`
    overflow: hidden;
    max-height: 0;
    padding: 0;
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