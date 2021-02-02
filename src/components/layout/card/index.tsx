import styled, { css } from "styled-components";

import { BorderRadius, Breakpoints, CARD_PICTURE_SIZE, Colors, Spacing } from "../../../styles/variables";

import { Horizontal, Vertical } from "../container";

const FrontImg = styled.img`
  z-index: 2;
  width: ${CARD_PICTURE_SIZE}px;
  height: ${CARD_PICTURE_SIZE}px;
  border-top-left-radius: ${BorderRadius.card}px;
  border-top-right-radius: ${BorderRadius.card}px;
  background-color: ${Colors.darkgrey};
`;

const BlurredImg = styled.img`
  transform: scale(0.7);
  filter: blur(16px);
  position: absolute;
  top: 0;
  z-index: 1;
  width: ${CARD_PICTURE_SIZE}px;
  height: ${CARD_PICTURE_SIZE}px;
  transition: transform 500ms ease-in-out;
`;

const TitleContainer = styled.div`
  background-color: ${Colors.white};
  z-index: 2;
  padding: ${Spacing.s}px ${Spacing.m}px;
  border-left: 1px solid ${Colors.darkgrey};
  border-right: 1px solid ${Colors.darkgrey};
  border-bottom: 1px solid ${Colors.darkgrey};
  border-bottom-left-radius: ${BorderRadius.card}px;
  border-bottom-right-radius: ${BorderRadius.card}px;
  transition: box-shadow 500ms ease-in-out;
`;

const StyledCard = styled(Vertical)`
  flex-direction: column;
  flex-shrink: 0;
  width: ${CARD_PICTURE_SIZE}px;
  position: relative;
  margin: ${Spacing.m}px;
  border-radius: ${BorderRadius.card}px;

  ${({ onClick }) => onClick && css`
    &:hover {
      cursor: pointer;

      ${BlurredImg} {
        transform: scale(1.05);
      }

      ${TitleContainer} {
        box-shadow: 0px 8px 25px 0px rgba(200, 200, 200, 0.75);
      }
    }
  `};
`;

type CardType = {
  title: string;
  imgSrc: string;
  onClick?: (event : React.MouseEvent<HTMLDivElement | MouseEvent>) => void;
};

export const Card : React.FC<CardType> = ({ title, imgSrc, onClick = undefined }) => (
  <StyledCard onClick={onClick}>
    <BlurredImg src={imgSrc} />
    <FrontImg src={imgSrc} />
    <TitleContainer>
      {title}
    </TitleContainer>
  </StyledCard>
);

type CardListType = {
  narrow?: boolean;
};

export const CardList = styled(Horizontal)<CardListType>`
  flex-wrap: wrap;
  margin: ${Spacing.none} ${-1 * Spacing.xl}px;
  padding: ${Spacing.l}px;
  height: 100%;
  overflow: auto;

  ${({ narrow }) => narrow && css`
    margin: ${-1 * Spacing.xs}px;
    padding: ${Spacing.none};
    overflow: unset;
  `};

  @media (max-width: ${Breakpoints.mobileMaxWidth}px) {
    padding: ${Spacing.none};
    margin: ${Spacing.none} ${-1.5 * Spacing.s}px;
  }
`;