# 26-01-2021 - Day 0
Test subject received. The subject seems quite simple, but there is a lot I'm not yet familiar with (SSR -> Next.js, GraphQL, Netlify). I think I'll go with the bolder approach and maximize the amount of unknown tools/lib I use for this test. It's a gamble, but I want to showcase that I can be flexible and learn fast, rather than proposing something strictly from my comfort zone.
I read a bit to refresh my memories of previous articles about GraphQL, Next.JS and Netlify. 
Using the heroku app provided in the subject, I play a bit with the API, to see the amount of data I'll be able to use and start thinking about a UI. I'd like to make some kind of Spotify-inspired UI with a bit of a neumorphism or glassmorphism twist to it, as I never implemented such UIs and I think they look nice. Let's stick with the additional challenge of stepping out of my comfort zone, why not using Tailwind as a CSS framework, and rely more heavily on CSS grids.


# 27-01-2021 - Day 1
I play some more with the GraphQL API, to see if the ideas I got during the day can be implemented. I'm a bit sad, the API does not seem to offer a stable image source for `artists` as it relies on external sources for media. Also, there does not seem to have a way to fetch random `artists` from the API, which compromise my original idea for the homepage. I start to wonder what my UI will look like, and if and how I will be able to showcase my UI/UX sensitivity.
I'm diving in the technical part, as my time is precious and I still have a lot to discover. First, let's setup a Next.js project that deploys on Netlify.
After a few minutes, I get a running Next.js app, they hold their promises : that's fast, all of the boilerplate is taken out from the more "classical" React app (even with Typescript support).
A few minutes later, after a first failed attempt, I get my Next.js app running on Netlify. Now I have a major issue, my naive routing approach relies on slugs in the URL, which depends on the API response. There's no way I will load all the possible `artist` IDs to generate the possible route options. Maybe my routing approach was too naive and I will need to change it. Let's dig into Next.js a bit deeper to see how to handle dynamic routing and deploys to Netlify, while keeping SSR in mind.
After some time watching videos, I found my answer https://explorers.netlify.com/learn/nextjs/nextjs-ssr-non. These videos are nice, short, step by step, and well structured. From what I understood, I get rid of the unnecessary code / config from my earlier attempts to have dynamic routes + SSR + netlify URL handling, I had the `getStaticPaths` method with `fallback: true` and see where it goes.
Sweet, I got it working. TL;DR : dumb me left the `next export` command during the build phase, which is used for static HTML generation, and I was aiming to use SSR and set up the associated plugin. Got caught on this one, but at least I'm making progress. Now, my Netlify app can handle arbitrary IDs.


# 28-01-2021 - Day 2
I had a message from Theo to confirm what I had in mind : there's a big limit for fetching pictures from the GraphQL API (should use the Spotify one, which has a restrictive rate limit). Instead, I should be using random images. I might use https://picsum.photos/ again, I'll see if the fetch does not take too long.
I'm trying to implement a bit of UI / layout to guide my dev forward. I'm finally not gonna use Tailwind for CSS and instead head for styled-components. It might be a missed discovery, but I feel it will help me progress faster. Maybe I'll change that, but first I need to be confident and satisfied with my work, to avoid wasting time and fail to deliver all what's required by the subject. Let's keep it realistic for now, there's already quite a good amount of discovery for now, and I don't want to jeopardize my success by pushing too much new stuff and spending my time learning instead of doing.
I got SSR + styled components working, I'm ready to move forward. It's more than time to get my hands on GraphQL using Apollo.
Ok, I got my GraphQL client up, and started to setup helpers to create my queries, tied it to a rudimentary input handling to fetch artists based on the user query. I set up a debounce mechanism, but a lot of my code today will need refactoring, everything's hardcoded, that's not up to my standards, but I need to progress before cleaning up. I sometimes have an error message regarding SSR + styled component during my local dev, I'll try to deploy the current version to see how it behaves online.
Everything works fine once deployed. I'm amazed by how simple everything seems to be, but I stay on guard, I barely touched the surface of these tools. From what I understood, the hot reload from next doesn't seem too happy when errors happen and it desyncs the server-side spreadsheet and the client one, resulting in my loss of styling and the error message. If I get some time, I should look into this.
My first UI tries start to look ok. I started to look into the pagination mechanism. It seems to be based on either `ID`s or `cursor`s I wonder what's the best approach. I'll follow the advice of the doc and go for the cursor (it reminds me of iterators, so it sounds more suited for the job).


# 29-01-2021 - Day 3
Eureka-day. I understood how to handle variables in queries in a clean way (exit the idea of taking advantage of query strings, I'm using the clean way provided by Apollo Client). This took a bit of time and reading, but it enable me to have a better idea on how to handle the infinite scroll asked by the subject and I feel this way is closer to a good result, compared to my naive template string approach. Now I have another issue : when I change my input query, the results are not refreshed.
Another step : I managed to have somewhat of a "load more" behavior, thanks to the `fetchMore` function. However, I can't seem to make it work properly, either when I change the query the results are not updated, or the load more refreshes the list instead of merging it. 
I spent the last few hours searching for a way to have a clean infinite scroll : append the the results if the query is not touched, refresh the whole list otherwise. I can't seem to make anything work, even after several pages of documentation and articles read. As it's listed in the "bonus" parts, I guess I'll leave it be for now, I need to make sure I fill all the mandatory requirements before shooting for bonus points.
Okay, after a dinner break I came up with an idea for this infinite scroll thingy, and my last attempt was successful. It seems a bit hackish, but hey, kudos to the guy that once said "If it's stupid but it works, it isn't stupid". I can now clear my head of this problem and keep progressing as I originally intended before my break.


# 30-01-2021 - Day 4
It starts to piece up together pretty nicely. I implemented the "artist details" page, and reworked my naive approach to fetch details independantly from the artist, probably some old reflex I got from classical APIs. If I understood correctly, in GraphQL it's expected that you pull all the needed content starting from the node you're targeting, so it's what I implemented.
I started a todo list on the side, to keep track of the ideas I have for the rest of the test, and to rank them by priorities, as I'm not 100% sure I'll be able to do everything (even though it's what I hope to achieve).
After a good afternoon of focus, I managed to get some "favorite" mechanism and a decent artist details page.
After diner, I managed to improve the UI quite a lot. It's far from perfect, but I wouldn't be disappointed if I can't change a lot of things before submitting this result.


# 31-01-2021 - Day 5
We're starting to near the end of the time frame for this test. Today, I've decided to focus on finishing my app in its actual state in order to have a submit-able code, instead of trying to add more and more stuff without properly finishing everything.
The first thing I want to tweak the "Favorite" feature in order to propose a clean UI to consider it done after the logic implemented yesterday.
I also start to clean up my mess a bit, split components in smaller units and start to define a few constants for reusability.
I added some finishing touches using Next.js `<Head>` API to make my app more like and app, and less like a local dev test.
I tweak the overall UI to have a somewhat responsive app.
I set TypeScript to `strict` in order to help me spot the missing types and improve my code quality.


# 01-02-2021 - Day 6
It's nearing the end of the test, today should be about the finishing touches to my app more than anything else. It's not perfect, and won't ever be, but I must ship something clean.
I have implemented the actual infinite scroll, as well as a cleaner "loading" message. I still have some UI/UX issues, but we're getting there.
I've successfully tweaked my infinite scroll to behave as I want, removing most data conflict I could think of.
I found an artist for which there is absolutely no provided Profile for its "abstract" section, I didn't think it would happen, but still, I'm glad I found it to think about setting a default message.


# 02-02-2021 - Day 7 / D Day
This is the final day for this test. I'm cleanup up the last details, rewording a few variables, tweaking a small value here and there, and I should be good to go. I'm quite satisfied with the end result, I'd say I've done roughly 80% of all the ideas I had at first. Let's hope this will be convincing for the jury !  