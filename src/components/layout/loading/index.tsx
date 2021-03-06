import styled, { keyframes } from "styled-components";

import { Colors, Spacing } from "../../../styles/variables";

import { Vertical } from "../container";

const LoadingRing = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled(Vertical)`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Loader = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  & > div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: ${Spacing.s}px;
    border: 8px solid ${Colors.darkgrey};
    border-radius: 50%;
    animation: ${LoadingRing} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${Colors.darkgrey} transparent transparent transparent;

    &:nth-child(1) {
      animation-delay: -0.45s;
    }
    &:nth-child(2) {
      animation-delay: -0.3s;
    }
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  }
`;

export const Spinner = () => (
  <Loader>
    <div />
    <div />
    <div />
  </Loader>
);

const Loading = () => (
  <LoadingContainer>
    <Spinner />
    <h2>
      Loading...
    </h2>
  </LoadingContainer>
);

export default Loading;