import { gql } from "@apollo/client";

export const queryArtist = gql`
  query GetArtist($searchedArtist: String!, $amount: Int!, $lastItemCursor: String!) {
    search {
      artists(query: $searchedArtist, first: $amount, after: $lastItemCursor) {
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
