import styled from "styled-components";

import { Breakpoints, Colors, Spacing } from "../../../styles/variables";

const MenuIcon = styled.span`
  height: 2px;
  width: 100%;
  background-color: ${Colors.whitish};
  border-radius: 2px;
  position: relative;
  display: block;

  &:before,
  &:after {
    position: absolute;
    content: " ";
    top: 50%;
    left: 50%;
    display: block;
    width: 100%;
    height: 2px;
    background-color: ${Colors.whitish};
    border-radius: 2px;
    transition: 0.5s background-color ease-in-out;
  }

  &:before {
    transform: translate(-50%, -7px);
    transition: 0.5s transform ease-in-out;
  }

  &:after {
    transform: translate(-50%, 5px);
    transition: 0.5s transform ease-in-out;
  }

  &.open {
    background-color: transparent;
    transition: 0.5s background-color ease-in-out;

    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
`;

const MobileButton = styled.button`
  border: none;
  box-shadow: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  padding: ${Spacing.s}px;
  margin-right: ${Spacing.m}px;

  @media (min-width: ${Breakpoints.tabletMinWidth}px) {
    display: none;
  }
`;

type ToggleButtonType = {
  menuDisplayed: boolean;
  setMenuDisplayed: (value: boolean) => void;
};

const ToggleButton : React.FC<ToggleButtonType> = ({ setMenuDisplayed, menuDisplayed }) => {
  const handleClick = () => setMenuDisplayed(!menuDisplayed);

  return (
    <MobileButton onClick={handleClick}>
      <MenuIcon className={menuDisplayed ? "open" : ""} />
    </MobileButton>
  );
};

export default ToggleButton;