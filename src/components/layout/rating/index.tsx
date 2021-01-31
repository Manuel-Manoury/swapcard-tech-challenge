import { useEffect, useState } from "react";
import styled from "styled-components";

import { Star } from "../../icons";
import { Horizontal, Vertical } from "../container";

const STAR_SPACING = 4;

type StarsContainerType = {
  starSize: number;
  rate?: number;
};

const StarsContainer = styled(Horizontal)<StarsContainerType>`
  z-index: 1;
  max-width: ${({ starSize }) => 5 * starSize + 4 * STAR_SPACING}px;

  &:not(:first-child) {
    z-index: 2;
    position: absolute;
    top: 0;
    transition: 500ms max-width ease-in-out;
    overflow: hidden;
    max-width: ${({ rate, starSize }) => rate ? `${rate * 5 * starSize + 4 * STAR_SPACING}px` : 0};
  }

  svg {
    flex-shrink: 0;
  }

  svg + svg {
    margin-left: ${STAR_SPACING}px;
  }
`;

const RatingContainer = styled(Vertical)`
  position: relative;
  margin: 8px 0;
`;

type RatingType = {
  rate: number;
  starSize?: number;
  voteCount: number;
};

const Rating : React.FC<RatingType> = ({ rate, starSize = 24, voteCount }) => {
  const [currentRate, setCurrentRate] = useState(0);

  useEffect(() => {
    setCurrentRate(rate / 5);
  }, []);

  return (
    <RatingContainer>
      <StarsContainer starSize={starSize}>
        <Star color="#CCCCCC" size={starSize} />
        <Star color="#CCCCCC" size={starSize} />
        <Star color="#CCCCCC" size={starSize} />
        <Star color="#CCCCCC" size={starSize} />
        <Star color="#CCCCCC" size={starSize} />
      </StarsContainer>
      <StarsContainer rate={currentRate} starSize={starSize}>
        <Star size={starSize} />
        <Star size={starSize} />
        <Star size={starSize} />
        <Star size={starSize} />
        <Star size={starSize} />
      </StarsContainer>
      <small>
        {rate} / 5 ({voteCount} votes)
      </small>
    </RatingContainer>
  );
};

export default Rating;
