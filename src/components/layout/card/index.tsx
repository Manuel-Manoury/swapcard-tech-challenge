import styled, { css } from "styled-components";

import { CARD_PICTURE_SIZE } from "../../../styles/variables";

import { Horizontal, Vertical } from "../container";

const FrontImg = styled.img`
  z-index: 2;
  width: ${CARD_PICTURE_SIZE}px;
  height: ${CARD_PICTURE_SIZE}px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const BlurredImg = styled.img`
  transform: scale(0.7);
  filter: blur(16px);
  position: absolute;
  top: 0;
  z-index: 1;
  width: ${CARD_PICTURE_SIZE}px;
  height: ${CARD_PICTURE_SIZE}px;
  transition: transform 300ms ease-in-out;
`;

const TitleContainer = styled.div`
  background-color: white;
  z-index: 2;
  padding: 8px 16px;
  border-left: 1px solid silver;
  border-right: 1px solid silver;
  border-bottom: 1px solid silver;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  transition: box-shadow 300ms ease-in-out;
`;

const StyledCard = styled(Vertical)`
  flex-direction: column;
  flex-shrink: 0;
  width: ${CARD_PICTURE_SIZE}px;
  position: relative;
  margin: 16px;
  border-radius: 8px;

  ${({ onClick }) => onClick && css`
    &:hover {
      cursor: pointer;

      ${BlurredImg} {
        transform: scale(1.05);
      }

      ${TitleContainer} {
        box-shadow: 0px 8px 25px 0px rgba(200,200,200,0.75);
      }
    }
  `}  
`;

export const Card = ({ title, imgSrc, onClick }) => {
  return (
    <StyledCard onClick={onClick}>
      <BlurredImg src={imgSrc} />
      <FrontImg src={imgSrc} />
      <TitleContainer>
        {title}
      </TitleContainer>
    </StyledCard>
  );
};

export const CardList = styled(Horizontal)`
  flex-wrap: wrap;
  margin: 0 -16px;
`;