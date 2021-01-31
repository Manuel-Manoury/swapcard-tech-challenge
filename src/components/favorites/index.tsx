import { useRouter } from "next/router";
import { useContext } from "react";
import styled from "styled-components";

import FavoritesContext from "../../context/favorites/context";

import { Vertical } from "../layout/container";

const FavoritesContainer = styled(Vertical)`
  h3 {
    margin: 0;
    text-align: center;
  }

  hr {
    border: none;
    border-bottom: 1px solid #212121;
    width: 80%;
    margin: 16px auto;
  }
`;

const FavoriteItem = styled.div`
  padding: 4px 16px;
  border-radius: 4px;
  transition: background-color 500ms ease-in-out, color 500ms ease-in-out;

  &:hover {
    background-color: #212121;
    color: #F2F2F2;
    cursor: pointer;
  }

  & + & {
    margin-top: 8px;
  }
`;

const Favorites = () => {
  const { data } = useContext(FavoritesContext);
  const router = useRouter();

  return (
    <FavoritesContainer>
      <h3>
        Favorites
      </h3>
      <hr />
      {
        data?.map(({ name, id, imgSrc}) => {
          const handleClick = () => {
            router.push(`/artist/${id}`);
          };

          return (
            <FavoriteItem key={id} onClick={handleClick}>
              {name}
            </FavoriteItem>
          )
        })
      }
    </FavoritesContainer>
  )
}

export default Favorites;