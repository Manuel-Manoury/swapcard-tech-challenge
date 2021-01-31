import { ApolloProvider } from "@apollo/client"; 
import Link from "next/link";
import Head from "next/head";

import "../styles/main.css";

import MusicBrainzClient from "../api/MusicBrainzClient";

import FavoritesProvider from "../context/favorites/provider";

import Header from "../components/layout/header";
import Sidebar from "../components/layout/sidebar";
import { PageLayout, PageContainer, PageContent } from "../components/layout/page";
import Favorites from "../components/favorites";


const Layout = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={MusicBrainzClient}>
      <FavoritesProvider>
        <Head>
          <title>soundwarp</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header>
          <Link href="/">
            <a>soundwarp</a>
          </Link>
        </Header>
        <PageLayout>
          <PageContainer>
            <Sidebar>
              <Favorites />
            </Sidebar>
            <PageContent>
              <Component {...pageProps} />
            </PageContent>
          </PageContainer>
        </PageLayout>
      </FavoritesProvider>
    </ApolloProvider>
  )
}

export default Layout