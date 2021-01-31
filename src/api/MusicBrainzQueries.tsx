import { gql } from "@apollo/client";

export const GET_ARTISTS = gql`
  query GetArtist($searchedArtist: String!, $amount: Int!, $lastItemCursor: String!) {
    search {
      artists(query: $searchedArtist, first: $amount, after: $lastItemCursor) {
        edges {
          node {
            name
            mbid
            id
            mediaWikiImages {
              url
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`

export const GET_ARTIST_DETAILS = gql`
  query GetArtistDetails($searchedArtistId: MBID!) {
    lookup {
      artist(mbid: $searchedArtistId) {
        name
        disambiguation
        country
        rating {
          value
          voteCount
        }
        mediaWikiImages {
          url
        }
        discogs {
          profile
        }
        releaseGroups {
          nodes {
            title
            id
            mbid
            primaryType
            coverArtArchive {
              front
            }
          }
        }
        lifeSpan {
          begin
          end
          ended
        }
      }
    }
  }
`