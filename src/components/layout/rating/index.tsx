import { useEffect, useState } from "react";
import styled from "styled-components";

import { Colors, Spacing } from '../../../styles/variables'; 

import { Star } from "../../icons";
import { Horizontal, Vertical } from "../container";

const STAR_SPACING = Spacing.xs;
const STAR_SIZE = Spacing.l;

type StarsContainerType = {
  rate?: number;
};

const StarsContainer = styled(Horizontal)<StarsContainerType>`
  z-index: 1;
  max-width: ${5 * STAR_SIZE + 4 * STAR_SPACING}px;

  &:not(:first-child) {
    z-index: 2;
    position: absolute;
    top: 0;
    transition: 500ms max-width ease-in-out;
    overflow: hidden;
    max-width: ${({ rate }) => rate ? `${rate * 5 * STAR_SIZE + 4 * STAR_SPACING}px` : 0};
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
  margin: ${Spacing.s}px ${Spacing.none};
`;

type RatingType = {
  rate: number;
  voteCount: number;
};

const Rating : React.FC<RatingType> = ({ rate, voteCount }) => {
  const [currentRate, setCurrentRate] = useState(0);

  useEffect(() => {
    setCurrentRate(rate / 5);
  }, []);

  return (
    <RatingContainer>
      <StarsContainer >
        <Star color={Colors.darkgrey} />
        <Star color={Colors.darkgrey} />
        <Star color={Colors.darkgrey} />
        <Star color={Colors.darkgrey} />
        <Star color={Colors.darkgrey} />
      </StarsContainer>
      <StarsContainer rate={currentRate}>
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </StarsContainer>
      <small>
        {rate} / 5 ({voteCount} votes)
      </small>
    </RatingContainer>
  );
};

export default Rating;
