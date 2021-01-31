import styled from "styled-components";

import { CARD_PICTURE_SIZE } from "../../styles/variables";

import { Star } from "../icons";
import { Horizontal, Vertical } from '../layout/container';
import Rating from "../layout/rating";

const ArtistHeaderContainer = styled(Horizontal)`
  margin-bottom: 32px;

  img {
    width: ${CARD_PICTURE_SIZE}px;
    height: ${CARD_PICTURE_SIZE}px;
    border-radius: 8px;
    margin-right: 32px;
  }
`;

const ArtistHeader = ({ name, disambiguation, start, end, rate, voteCount, imgSrc, handleFavoriteClick }) => {
  return (
    <ArtistHeaderContainer>
      <img src={imgSrc} />
      <Vertical>
        <h2>
          {name}
        </h2>
        <i>
          {disambiguation}
        </i>
        <p>
          {start} - {end}
        </p>
        <Rating rate={rate} voteCount={voteCount} />
        <Horizontal>
          <button onClick={handleFavoriteClick}>Add to favorites <Star /></button>
        </Horizontal>
      </Vertical>
    </ArtistHeaderContainer>
  );
};

export default ArtistHeader;