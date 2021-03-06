import { useContext } from "react";
import { useQuery } from "@apollo/client";
import Head from "next/head";
import styled from "styled-components";

import FavoritesContext from "../../../context/favorites/context";

import { CARD_PICTURE_SIZE, Spacing } from "../../../styles/variables";

import { GET_ARTIST_DETAILS, ReleaseGroupType } from "../../../api/MusicBrainzQueries";

import { ArtistHeader, ArtistSection } from "../../../components/artists";
import { Card, CardList } from "../../../components/layout/card";
import { Vertical } from "../../../components/layout/container";
import Loading from "../../../components/layout/loading";

const PageContainer = styled(Vertical)`
  height: 100%;
  overflow-x: hidden;
`;

type ArtistPageType = {
  artistId: string;
};

const ArtistPage : React.FC<ArtistPageType> = ({ artistId }) => {
  const { loading, data } = useQuery(GET_ARTIST_DETAILS, { variables: { searchedArtistId: artistId } });
  const { data: favoriteData, add : addFavorite, remove: removeFavorite } = useContext(FavoritesContext);

  const isFavorite = () => {
    return !!favoriteData.find((favorite) => favorite.id === artistId);
  };

  const handleFavoriteClick = () => {
    const favoriteItem = {
      id: artistId,
      name: data?.lookup?.artist?.name
    };

    if (isFavorite()) {
      removeFavorite(favoriteItem);
    } else {
      addFavorite(favoriteItem);
    }
  };

  if (loading) return <Loading />;

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
        start={data?.lookup?.artist?.lifeSpan?.begin || "unknown"}
        end={data?.lookup?.artist?.lifeSpan?.end || "today"}
        rate={data?.lookup?.artist?.rating?.value || 0}
        voteCount={data?.lookup?.artist?.rating?.voteCount}
        handleFavoriteClick={handleFavoriteClick}
        isFavorite={isFavorite()}
      />
      <ArtistSection title="Abstract">
        <p style={{ padding: `${Spacing.none} ${Spacing.m}px` }}>
          {data?.lookup?.artist?.discogs?.profile || <i>No data found</i>}
        </p>
      </ArtistSection>
      <ArtistSection title="Records">
        <CardList narrow>
          {data?.lookup?.artist?.releaseGroups?.nodes?.length ? (
            data?.lookup?.artist?.releaseGroups?.nodes?.map((node : ReleaseGroupType) => (
              <Card
                title={node.title}
                key={node.id}
                imgSrc={node.coverArtArchive.front || `https://picsum.photos/seed/${node.mbid}/${CARD_PICTURE_SIZE}/${CARD_PICTURE_SIZE}`}
              />
            ))
          ) : (
            <i style={{ padding: `${2.5 * Spacing.s}px` }}>No data found</i>
          )}
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
  };
};

export const getStaticProps = ({ params } : any) => {
  return {
    props: { artistId: params.artistId }
  };
};