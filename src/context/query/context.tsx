import React from "react";

type QueryType = {
  term: string;
  set: (term: string) => void;
};

const QueryContext = React.createContext<QueryType>({ 
  term: "", 
  set: (_ : string) => {}
});

export default QueryContext;