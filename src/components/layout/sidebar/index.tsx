import styled from "styled-components";

import { Vertical } from "../container";

type SidebarType = {
  shown: boolean;
};

const Sidebar = styled(Vertical)<SidebarType>`
  width: 250px;
  flex-shrink: 0;
  height: 100%;
  padding: 32px;
  background-color: #CCCCCC;

  @media (max-width: 767px) {
    position: absolute;
    z-index: 3;
    width: 100%;
    max-height: calc(100% - 80px);
    transition: 500ms left ease-in-out;
    left: ${({ shown }) => shown ? "0" : "-100%"};
  }
`;

export default Sidebar;