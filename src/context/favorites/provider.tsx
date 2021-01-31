import { useEffect, useState } from "react";

import FavoriteContext from "./context";

type FavoriteType = {
  id: string;
  name: string;
};

const FavoritesProvider : React.FC<{}> = ({ children }) => {
  const [storedFavorites, setStoredFavorites] = useState<Array<FavoriteType>>([]);
  const [shouldPersist, setShouldPersist] = useState(false);

  const handleAddFavorite = (item : FavoriteType) => {
    setShouldPersist(true);
    setStoredFavorites([...storedFavorites, item]);
  };

  const handleRemoveFavorite = (item : FavoriteType) => {
    const existingFavorite = storedFavorites.find((storedFavorite) => storedFavorite.id === item.id);

    if (existingFavorite) {
      let copiedFavorites = [...storedFavorites];

      copiedFavorites.splice(storedFavorites.indexOf(existingFavorite), 1);
      setShouldPersist(true);
      setStoredFavorites(copiedFavorites);
    }
  };
  
  useEffect(() => {
    if (shouldPersist) {
      window.localStorage.setItem("soundwarp-favorites", JSON.stringify(storedFavorites));
    }
  }, [storedFavorites]);

  useEffect(() => {
    const localStorageFavorites = window.localStorage.getItem("soundwarp-favorites");
    const soundwarpFavorites = localStorageFavorites ? JSON.parse(localStorageFavorites) : []; 

    setStoredFavorites(soundwarpFavorites);
  }, []);

  return (
    <FavoriteContext.Provider value={{ data: storedFavorites, add: handleAddFavorite, remove: handleRemoveFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoritesProvider;