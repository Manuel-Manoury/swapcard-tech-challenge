import styled from 'styled-components';

import { Vertical } from '../layout/container'

const BlurredImg = styled.img`
  transform: scale(0.7);
  filter: blur(16px);
  position: absolute;
  top: 0;
  z-index: 1;
  transition: transform 300ms ease-in-out;
`;

const StyledArtistCard = styled(Vertical)`
  flex-direction: column;
  flex-shrink: 0;
  width: 200px;
  position: relative;
  margin: 16px;

  & > img {
    z-index: 2;
    border-radius: 8px;
  }

  &:hover ${BlurredImg} {
    transform: scale(1.05);
  }
`;

const ArtistCard = ({ name, id }) => {
  return (
    <StyledArtistCard>
      <BlurredImg src={`https://picsum.photos/seed/${id}/200/200`} />
      <img src={`https://picsum.photos/seed/${id}/200/200`} />
      {name}
    </StyledArtistCard>
  )
}

export default ArtistCard