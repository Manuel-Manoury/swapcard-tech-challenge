import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://graphbrainz.herokuapp.com',
  cache: new InMemoryCache({
    typePolicies: {
      SearchQuery: {
        fields : {
          artists: {
            keyArgs: false,
            merge(existing = { edges: [] }, incoming, { args }) {
              if (existing.__typename && existing.__typename === `${incoming.__typename}-${args.query}`)
                return {
                  ...incoming,
                  edges: [...existing.edges, ...incoming.edges],
                  __typename: `${incoming.__typename}-${args.query}`
                };

              return {
                 ...incoming,
                 __typename: `${incoming.__typename}-${args.query}`
              }
            },
          }
        },
      },
    },
  })
});

export default client;