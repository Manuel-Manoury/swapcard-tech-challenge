import styled from "styled-components";

import { BorderRadius, Breakpoints, CARD_PICTURE_SIZE, Colors, Spacing } from "../../styles/variables";

import { Star } from "../icons";
import { Horizontal, Vertical } from "../layout/container";
import Rating from "../layout/rating";

const ArtistHeaderContainer = styled(Horizontal)`
  margin-bottom: ${Spacing.xl}px;

  img {
    width: ${CARD_PICTURE_SIZE}px;
    height: ${CARD_PICTURE_SIZE}px;
    border-radius: ${BorderRadius.card}px;
    margin-right: ${Spacing.xl}px;
  }

  @media (max-width: ${Breakpoints.mobileMaxWidth}px) {
    flex-direction: column;
  }
`;

const NameWrapper = styled(Horizontal)`
  align-items: center;

  & > div {
    height: 100%;
    margin-left: ${Spacing.m}px;
    display: flex;

    &:hover {
      cursor: pointer;
    }

    & > svg {
      margin: auto;
    }
  }
`;

type ArtistHeaderType = {
  name: string;
  disambiguation: string;
  start: string;
  end: string;
  rate: number;
  voteCount: number;
  imgSrc: string;
  isFavorite: boolean;
  handleFavoriteClick: (item : React.MouseEvent<HTMLDivElement>) => void;
};

const ArtistHeader : React.FC<ArtistHeaderType> = ({ name, disambiguation, start, end, rate, voteCount, imgSrc, handleFavoriteClick, isFavorite }) => (
  <ArtistHeaderContainer>
    <img src={imgSrc} />
    <Vertical>
      <NameWrapper>
        <h2>
          {name}
        </h2>
        <div onClick={handleFavoriteClick}>
          <Star color={isFavorite ? Colors.yellow : Colors.darkgrey} />
        </div>
      </NameWrapper>
      <i>
        {disambiguation}
      </i>
      <p>
        {start} - {end}
      </p>
      <Rating rate={rate} voteCount={voteCount} />
    </Vertical>
  </ArtistHeaderContainer>
);

export default ArtistHeader;