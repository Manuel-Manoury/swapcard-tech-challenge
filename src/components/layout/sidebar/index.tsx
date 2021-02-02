import styled from "styled-components";

import { Breakpoints, Colors, Spacing } from "../../../styles/variables";

import { Vertical } from "../container";
import { HEADER_HEIGHT } from "../header";

const SIDEBAR_WIDTH = 250;

type SidebarType = {
  shown: boolean;
};

const Sidebar = styled(Vertical)<SidebarType>`
  width: ${SIDEBAR_WIDTH}px;
  flex-shrink: 0;
  height: 100%;
  padding: ${Spacing.xl}px;
  background-color: ${Colors.darkgrey};

  @media (max-width: ${Breakpoints.mobileMaxWidth}px) {
    position: absolute;
    z-index: 3;
    width: 100%;
    max-height: calc(100% - ${HEADER_HEIGHT}px);
    transition: 500ms left ease-in-out;
    left: ${({ shown }) => shown ? "0" : "-100%"};
  }
`;

export default Sidebar;