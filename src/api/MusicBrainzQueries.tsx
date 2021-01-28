import { gql } from "@apollo/client";

export const queryArtist = (artist) => gql`
  {
    search {
      artists(query: "${artist}", first: 15) {
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
