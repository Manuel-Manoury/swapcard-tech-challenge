import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { CARD_PICTURE_SIZE } from "../styles/variables";

import { GET_ARTISTS } from "../api/MusicBrainzQueries";

import QueryContext from "../context/query/context";

import { Card } from "../components/layout/card";
import SearchInput from "../components/layout/input/search";
import Loading from "../components/layout/loading";
import InfiniteScroll from "../components/layout/infinite-scroll";

const LOAD_MORE_STEP = 9;

const HomePage = () => {
  const [query, setQuery] = useState("");
  const { set: setQueryTerm, term: queryTerm } = useContext(QueryContext);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [contentChanged, setContentChanged] = useState(false);
  const [searchedArtist, setSearchedArtist] = useState(query);
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

  const clearInput = () => {
    setQuery("");
  }

  const handleQueryChanged = (e : any) => {
    setQuery(e.target.value);
  };

  const loadMore = () => { 
    if (data?.search?.artists?.pageInfo.hasNextPage && !isLoadingMore) {
      setIsLoadingMore(true);
      fetchMore({ 
        variables: { 
          searchedArtist : searchedArtist || queryTerm, 
          amount: LOAD_MORE_STEP, 
          lastItemCursor: data?.search?.artists?.pageInfo.endCursor 
        } 
      });
    }
  };

  useEffect(() => {
    let updateSearchArtistTimeout = setTimeout(() => setSearchedArtist(query), 500);

    return () => clearTimeout(updateSearchArtistTimeout);
  }, [query]);

  useEffect(() => {
    if (searchedArtist) {
      setContentChanged(true);
      setQueryTerm(searchedArtist);
      refetch({
        searchedArtist,
        amount: LOAD_MORE_STEP,
        lastItemCursor: ""
      });
    }
  }, [searchedArtist]);

  useEffect(() => {
    setIsLoadingMore(false);
  }, [data]);

  useEffect(() => {
    setContentChanged(false);
  }, [data?.search?.artists?.__typename]);

  // if (error) return <p>Error :(</p>;

  return (
    <>
      <SearchInput 
        type="text" 
        onChange={handleQueryChanged} 
        value={query} 
        clearInput={clearInput} 
        placeholder="Search an artist..."
        disabled={loading || contentChanged}
      />
      {
        loading || contentChanged ? (
          <Loading />
        ) : (
          <InfiniteScroll loadMore={loadMore} isLoadingMore={isLoadingMore} contentChanged={contentChanged}>
            {data?.search?.artists?.edges?.map(({ node } : any) => {
              const handleClick = (e: any) => {
                e.preventDefault();
                router.push(`/artist/${node.mbid}`);
              };

              return (
                <Card
                  title={node.name}
                  onClick={handleClick}
                  key={node.id} 
                  imgSrc={node.mediaWikiImages[0]?.url || `https://picsum.photos/seed/${node.mbid}/${CARD_PICTURE_SIZE}/${CARD_PICTURE_SIZE}`} 
                />
              );
            })}
          </InfiniteScroll>
        )
      }
    </>
  );
};

export default HomePage;
