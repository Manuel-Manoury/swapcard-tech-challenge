import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { queryArtist } from "../api/MusicBrainzQueries";

const HomePage = () => {
  const [query, setQuery] = useState('Nirvana')
  const [searchedArtist, setSearchedArtist] = useState(query)
  const { loading, error, data } = useQuery(queryArtist(searchedArtist));

  const handleQueryChanged = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    let updateSearchArtistTimeout = setTimeout(() => setSearchedArtist(query), 750)

    return () => clearTimeout(updateSearchArtistTimeout);
  }, [query])

  useEffect(() => {
    console.log(data)
  }, [data])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <input type="text" onChange={handleQueryChanged} value={query} />
    </div>
  );
};

export default HomePage;
