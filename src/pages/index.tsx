import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import styled from 'styled-components';

import { queryArtist } from "../api/MusicBrainzQueries";

import ArtistCard from "../components/artists";
import Container, { Horizontal } from '../components/layout/container';

const LOAD_MORE_STEP = 10;

const ArtistList = styled(Horizontal)`
  flex-wrap: wrap;
`;

const HomePage = () => {
  const [query, setQuery] = useState('')
  const [searchedArtist, setSearchedArtist] = useState(query)
  const { loading, error, data, fetchMore, refetch } = useQuery(
    queryArtist, 
    {
      variables:
        {
          searchedArtist,
          amount: LOAD_MORE_STEP,
          lastItemCursor: ''
        }
    }
  );

  const handleQueryChanged = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    let updateSearchArtistTimeout = setTimeout(() => setSearchedArtist(query), 750)

    return () => clearTimeout(updateSearchArtistTimeout);
  }, [query])

  useEffect(() => {
    if (searchedArtist) {
      refetch({
        searchedArtist,
        amount: LOAD_MORE_STEP,
        lastItemCursor: ''
      })
    }
  }, [searchedArtist])

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;

  return (
    <Container>
      <input type="text" onChange={handleQueryChanged} value={query} />
      <ArtistList>
        {data?.search?.artists?.edges?.map(({node}) => <ArtistCard name={node.name} id={node.mbid} key={node.id} />)}
      </ArtistList>
      <button onClick={() => { fetchMore({ variables: { amount: LOAD_MORE_STEP, lastItemCursor: data?.search?.artists?.pageInfo.endCursor } }) }}>Load more</button>
    </Container>
  );
};

export default HomePage;
