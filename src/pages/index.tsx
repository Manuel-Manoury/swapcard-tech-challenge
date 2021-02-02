import { useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { CARD_PICTURE_SIZE } from "../styles/variables";

import { ArtistNodeType, GET_ARTISTS } from "../api/MusicBrainzQueries";

import QueryContext from "../context/query/context";

import { Card } from "../components/layout/card";
import SearchInput from "../components/layout/input/search";
import Loading from "../components/layout/loading";
import InfiniteScroll from "../components/layout/infinite-scroll";

const LOAD_MORE_STEP = 9;
const QUERY_DEBOUNCE_TIME = 750;

const HomePage = () => {
  const [query, setQuery] = useState("");
  const { set: setQueryTerm, term: queryTerm } = useContext(QueryContext);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [contentChanging, setContentChanging] = useState(false);
  const [searchedArtist, setSearchedArtist] = useState(query);
  const router = useRouter();
  const { loading, data, fetchMore, refetch } = useQuery(
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
    setQueryTerm("");
  }

  const handleQueryChanged = (e : React.ChangeEvent<HTMLInputElement>) => {
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
    let updateSearchArtistTimeout = setTimeout(() => setSearchedArtist(query), QUERY_DEBOUNCE_TIME);

    return () => clearTimeout(updateSearchArtistTimeout);
  }, [query]);

  useEffect(() => {
    if (searchedArtist) {
      setContentChanging(true);
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
    setContentChanging(false);
  }, [data?.search?.artists?.__typename]);

  return (
    <>
      <SearchInput 
        type="text" 
        onChange={handleQueryChanged} 
        value={query || queryTerm}
        clearInput={clearInput} 
        placeholder="Search an artist..."
        disabled={loading || contentChanging}
      />
      {
        loading || contentChanging ? (
          <Loading />
        ) : (
          <InfiniteScroll loadMore={loadMore} isLoadingMore={isLoadingMore}>
            {data?.search?.artists?.edges?.map(({ node } : ArtistNodeType) => {
              const handleClick = (e: React.MouseEvent<HTMLDivElement | MouseEvent>) => {
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
