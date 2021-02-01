# swapcard-tech-challenge

Online version : https://agitated-wright-72c6ef.netlify.app/

# What could be improved ?
**The UI**. It's a bit cold even though I went for something clean, the fact that I tend to use pure "mathematical" color shades instead of tinted ones tend to make the whole interface less warm and welcoming than what I could be. Also some animation might use a bit of tweaking to make them smoother.

**Images**. I didn't optimize their sizing / loading, consequently some are a bit long to load, some are a bit stretched and so on.

**Favorites**. I rely for now on a serialized JSON array stored in the `localStorage`. This works fine for the test, but if we want to handle higher amounts of data, it might be better to switch to using another storage such as the IndexedDB. 

**Release details**. I originally intended to propose a page with the different releases (and for each release, their tracks with name, duration and son on) to give a bit more content, and as the subject suggest, implement more views and a useful navigation. However, it might be a misunderstanding of GraphQL / Apollo from my side (after all, I first used them for this test), but I did not manage to get the releases associated to a releaseGroup. My query looks as follows : 
```
query GetRecords($releaseGroupMBID: MBID!, $amount: Int!, $lastItemCursor: String!) {
  browse {
    releaseGroups(artist: $releaseGroupMBID, first: $amount, after: $lastItemCursor) {
      edges {
        node {
          title
          id
          mbid
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
```
With such a query, I end up facing the `The given parameters do not match any available query type for the release resource.` error message, even though I can't understand why it doesn't work, considering it seems to be working fine on the MusicBrainz website.

**Error messages**. I didn't use the error provided by Apollo, and that's clearly taking a risk from both an application and a UX perspective.