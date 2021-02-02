import { useRouter } from "next/router";
import { useContext } from "react";
import styled from "styled-components";

import FavoritesContext from "../../context/favorites/context";

import { BorderRadius, Colors, Spacing } from "../../styles/variables";

import { Vertical } from "../layout/container";

const FavoritesContainer = styled(Vertical)`
  max-height: 100%;

  h3 {
    margin: ${Spacing.none};
    text-align: center;
  }

  hr {
    border: none;
    border-bottom: 1px solid ${Colors.blackish};
    width: 80%;
    margin: ${Spacing.m}px auto;
  }
`;

const FavoriteItemsContainer = styled(Vertical)`
  overflow: auto;
`;

const FavoriteItem = styled.div`
  padding: ${Spacing.xs}px ${Spacing.m}px;
  border-radius: ${BorderRadius.button}px;
  transition: background-color 500ms ease-in-out, color 500ms ease-in-out;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  &:hover {
    background-color: ${Colors.blackish};
    color: ${Colors.whitish};
    cursor: pointer;
  }

  & + & {
    margin-top: ${Spacing.s}px;
  }
`;

type FavoriteType = {
  closeMenuDisplay: () => void;
};

const Favorites : React.FC<FavoriteType> = ({ closeMenuDisplay }) => {
  const { data } = useContext(FavoritesContext);
  const router = useRouter();

  return (
    <FavoritesContainer>
      <h3>
        Favorites
      </h3>
      <hr />
      <FavoriteItemsContainer>
        {
          data?.map(({ name, id }) => {
            const handleClick = () => {
              router.push(`/artist/${id}`);
              closeMenuDisplay();
            };

            return (
              <FavoriteItem key={id} onClick={handleClick}>
                {name}
              </FavoriteItem>
            )
          })
        }
      </FavoriteItemsContainer>
    </FavoritesContainer>
  );
};

export default Favorites;