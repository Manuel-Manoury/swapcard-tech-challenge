import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { queryArtist } from "../api/MusicBrainzQueries";

import ArtistCard from "../components/artists";
import { Horizontal } from '../components/layout/container';

const HomePage = () => {
  const [query, setQuery] = useState('')
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
  // if (error) return <p>Error :(</p>;

  return (
    <>
      <input type="text" onChange={handleQueryChanged} value={query} />
      <Horizontal>
        {data?.search?.artists?.edges?.map(({node}) => <ArtistCard name={node.name} id={node.mbid} key={node.id} />)}
      </Horizontal>
    </>
  );
};

export default HomePage;
