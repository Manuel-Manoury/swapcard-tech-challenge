import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Head from "next/head";
import styled from "styled-components";

import FavoritesContext from "../../../context/favorites/context";

import { CARD_PICTURE_SIZE } from "../../../styles/variables";

import { GET_ARTIST_DETAILS } from "../../../api/MusicBrainzQueries";

import { ArtistHeader, ArtistSection } from "../../../components/artists";
import { Card, CardList } from "../../../components/layout/card";
import { Vertical } from "../../../components/layout/container";

const PageContainer = styled(Vertical)`
  height: 100%;
  overflow-x: hidden;
`;

const ArtistPage = () => {
  const router = useRouter()
  const { artistId } = router.query
  const { loading, error, data } = useQuery(GET_ARTIST_DETAILS, { variables: { searchedArtistId: artistId } });
  const { add : addFavorite, remove: removeFavorite, find: findFavorite } = useContext(FavoritesContext)

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;

  const handleFavoriteClick = () => {
    const favoriteItem = {
      id: artistId,
      imgSrc: data?.lookup?.artist?.mediaWikiImages[0]?.url || `https://picsum.photos/seed/${artistId}/${CARD_PICTURE_SIZE}/${CARD_PICTURE_SIZE}`,
      name: data?.lookup?.artist?.name
    };

    if (findFavorite(favoriteItem)) {
      removeFavorite(favoriteItem);
    } else {
      addFavorite(favoriteItem);
    }
  }

  return (
    <PageContainer>
      <Head>
        <title>
          soundwarp - {data?.lookup?.artist?.name}
        </title>
      </Head>
      <ArtistHeader
        imgSrc={data?.lookup?.artist?.mediaWikiImages[0]?.url || `https://picsum.photos/seed/${artistId}/${CARD_PICTURE_SIZE}/${CARD_PICTURE_SIZE}`}
        name={data?.lookup?.artist?.name}
        disambiguation={data?.lookup?.artist?.disambiguation}
        start={data?.lookup?.artist?.lifeSpan?.begin}
        end={data?.lookup?.artist?.lifeSpan?.end || "today"}
        rate={data?.lookup?.artist?.rating?.value || 0}
        voteCount={data?.lookup?.artist?.rating?.voteCount}
        handleFavoriteClick={handleFavoriteClick}
      />
      <ArtistSection title="Abstract">
        <p style={{ padding: '0 16px' }}>
          {data?.lookup?.artist?.discogs?.profile}
        </p>
      </ArtistSection>
      <ArtistSection title="Records">
        <CardList narrow>
          {data?.lookup?.artist?.releaseGroups?.nodes?.map((node) => { 
            // const handleClick = (e) => {
            //   e.preventDefault()
            //   router.push(`/artist/${artistId}/album/${node.mbid}`);
            // }

            return (
              <Card 
                title={node.title} 
                key={node.id} 
                // onClick={handleClick}
                imgSrc={node.coverArtArchive.front || `https://picsum.photos/seed/${node.mbid}/${CARD_PICTURE_SIZE}/${CARD_PICTURE_SIZE}`} 
              />
            )
          })}
        </CardList>
      </ArtistSection>
    </PageContainer>
  );
};

export default ArtistPage;

export const getStaticPaths = () => {
  return {
    paths : [],
    fallback: true  
  }
}

export const getStaticProps = ({ params }) => {
  return {
    props: { artistId: params.artistId }
  }
}