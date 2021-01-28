import { gql } from "@apollo/client";

export const queryArtist = (artist) => gql`
  {
    search {
      artists(query: "${artist}") {
        nodes {
          name
          mbid
        }
      }
    }
  }
`
