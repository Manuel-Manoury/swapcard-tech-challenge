import React from "react";

const FavoritesContext = React.createContext({ 
  data: [], 
  add: (_ : any) => {},
  remove: (_ : any) => {},
  find: (_: any) => ({}),
});

export default FavoritesContext