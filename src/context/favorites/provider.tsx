import { useEffect, useState } from "react";

import FavoriteContext from "./context";

const FavoritesProvider = ({ children }) => {
  const [storedFavorites, setStoredFavorites] = useState(null);
  const [shouldPersist, setShouldPersist] = useState(false);

  const handleAddFavorite = (item) => setStoredFavorites([...storedFavorites, item]);
  const handleFindFavorite = (item) => storedFavorites.find((storedFavorite) => storedFavorite.id === item.id);
  const handleRemoveFavorite = (item) => {
    const existingFavorite = handleFindFavorite(item);

    if (existingFavorite) {
      let copiedFavorites = [...storedFavorites];

      copiedFavorites.splice(storedFavorites.indexOf(existingFavorite), 1);
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
    setShouldPersist(true);
  }, []);

  return (
    <FavoriteContext.Provider value={{ data: storedFavorites, add: handleAddFavorite, remove: handleRemoveFavorite, find: handleFindFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoritesProvider;