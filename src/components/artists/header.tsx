import styled from "styled-components";

import { CARD_PICTURE_SIZE } from "../../styles/variables";

import { Star } from "../icons";
import { Horizontal, Vertical } from "../layout/container";
import Rating from "../layout/rating";

const ArtistHeaderContainer = styled(Horizontal)`
  margin-bottom: 32px;

  img {
    width: ${CARD_PICTURE_SIZE}px;
    height: ${CARD_PICTURE_SIZE}px;
    border-radius: 8px;
    margin-right: 32px;
  }

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const NameWrapper = styled(Horizontal)`
  align-items: center;

  & > div {
    height: 100%;
    margin-left: 16px;
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
  handleFavoriteClick: (item : any) => void;
};

const ArtistHeader : React.FC<ArtistHeaderType> = ({ name, disambiguation, start, end, rate, voteCount, imgSrc, handleFavoriteClick, isFavorite }) => {
  return (
    <ArtistHeaderContainer>
      <img src={imgSrc} />
      <Vertical>
        <NameWrapper>
          <h2>
            {name}
          </h2>
          <div onClick={handleFavoriteClick}>
            <Star color={isFavorite ? "#ffc107" : "#CCCCCC"} />
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
};

export default ArtistHeader;