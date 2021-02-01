import { useState } from "react";

import QueryContext from "./context";

const QueryProvider : React.FC<{}> = ({ children }) => {
  const [queryTerm, setQueryTerm] = useState("");

  return (
    <QueryContext.Provider value={{ term: queryTerm, set: setQueryTerm }}>
      {children}
    </QueryContext.Provider>
  );
};

export default QueryProvider;