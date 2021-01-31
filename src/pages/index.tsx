import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { CARD_PICTURE_SIZE } from "../styles/variables";

import { GET_ARTISTS } from "../api/MusicBrainzQueries";

import { Card, CardList } from "../components/layout/card";

const LOAD_MORE_STEP = 6;

const HomePage = () => {
  const [query, setQuery] = useState("")
  const [searchedArtist, setSearchedArtist] = useState(query)
  const router = useRouter();
  const { loading, error, data, fetchMore, refetch } = useQuery(
    GET_ARTISTS, 
    {
      variables:
        {
          searchedArtist,
          amount: LOAD_MORE_STEP,
          lastItemCursor: ""
        }
    }
  );

  const handleQueryChanged = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    let updateSearchArtistTimeout = setTimeout(() => setSearchedArtist(query), 500)

    return () => clearTimeout(updateSearchArtistTimeout);
  }, [query])

  useEffect(() => {
    if (searchedArtist) {
      refetch({
        searchedArtist,
        amount: LOAD_MORE_STEP,
        lastItemCursor: ""
      })
    }
  }, [searchedArtist])

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;

  return (
    <>
      <input type="text" onChange={handleQueryChanged} value={query} placeholder="Search an artist..." />
      <CardList>
        {data?.search?.artists?.edges?.map(({node}) => {
          const handleClick = (e) => {
            e.preventDefault()
            router.push(`/artist/${node.mbid}`);
          }

          return (
            <Card 
              title={node.name}
              onClick={handleClick}
              key={node.id} 
              imgSrc={node.mediaWikiImages[0]?.url || `https://picsum.photos/seed/${node.mbid}/${CARD_PICTURE_SIZE}/${CARD_PICTURE_SIZE}`} 
            />
          );
        })}
      </CardList>
      {
        data?.search?.artists?.pageInfo.hasNextPage && (
          <button onClick={() => { fetchMore({ variables: { amount: LOAD_MORE_STEP, lastItemCursor: data?.search?.artists?.pageInfo.endCursor } }) }}>
            Load more
          </button>
        )
      }      
    </>
  );
};

export default HomePage;
