import { gql } from "@apollo/client";

export const queryArtist = (artist) => gql`
  {
    search {
      artists(query: "${artist}") {
        edges {
          node {
            name
            mbid
            id
          }
          cursor
        }
        totalCount
        pageInfo {
          startCursor
          endCursor
        }
      }
    }
  }
`
