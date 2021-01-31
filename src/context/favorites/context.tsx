import React from "react";

type FavoriteType = {
  id: string;
  name: string;
};

type FavoriteContextType = {
  data: Array<FavoriteType>;
  add: (item: FavoriteType) => void;
  remove: (item: FavoriteType) => void;
};

const FavoritesContext = React.createContext<FavoriteContextType>({ 
  data: [], 
  add: (_) => {},
  remove: (_) => {},
});

export default FavoritesContext;