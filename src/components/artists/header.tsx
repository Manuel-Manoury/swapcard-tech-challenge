import styled from "styled-components";

import { CARD_PICTURE_SIZE } from "../../styles/variables";

import { Horizontal, Vertical } from '../layout/container';

const ArtistHeaderContainer = styled(Horizontal)`
  margin-bottom: 32px;

  img {
    width: ${CARD_PICTURE_SIZE}px;
    height: ${CARD_PICTURE_SIZE}px;
    border-radius: 8px;
    margin-right: 32px;
  }
`;

const ArtistHeader = ({ name, disambiguation, start, end, rating, ratingCount, imgSrc, handleFavoriteClick }) => {
  return (
    <ArtistHeaderContainer>
      <img src={imgSrc} />
      <Vertical>
        <div>
          {name}
        </div>
        <div>
          <i>
            {disambiguation}
          </i>
        </div>
        <div>
          {start} - {end}
        </div>
        <div>
          {rating} / 5 ({ratingCount} votes)
        </div>
        <Horizontal>
          <button onClick={handleFavoriteClick}>Add to favorites</button>
        </Horizontal>
      </Vertical>
    </ArtistHeaderContainer>
  );
};

export default ArtistHeader;