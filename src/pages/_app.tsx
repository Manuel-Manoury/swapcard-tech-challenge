import { useState } from "react";
import { ApolloProvider } from "@apollo/client"; 
import Link from "next/link";
import Head from "next/head";

import "../styles/main.css";

import MusicBrainzClient from "../api/MusicBrainzClient";

import FavoritesProvider from "../context/favorites/provider";
import QueryProvider from "../context/query/provider";

import Header from "../components/layout/header";
import Sidebar from "../components/layout/sidebar";
import { PageLayout, PageContainer, PageContent } from "../components/layout/page";
import Favorites from "../components/favorites";
import ToggleButton from "../components/layout/sidebar/toggle-button";

type LayoutType = {
  Component: React.FC<any>;
  pageProps: any;
};

const Layout : React.FC<LayoutType> = ({ Component, pageProps }) => {
  const [menuDisplayed, setMenuDisplayed] = useState(false);

  const closeMenuDisplay = () => setMenuDisplayed(false);

  return (
    <ApolloProvider client={MusicBrainzClient}>
      <QueryProvider>
        <FavoritesProvider>
          <Head>
            <title>soundwarp</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
          <Header>
            <ToggleButton setMenuDisplayed={setMenuDisplayed} menuDisplayed={menuDisplayed} />
            <Link href="/">
              <a>soundwarp</a>
            </Link>
          </Header>
          <PageLayout>
            <PageContainer>
              <Sidebar shown={menuDisplayed}>
                <Favorites closeMenuDisplay={closeMenuDisplay} />
              </Sidebar>
              <PageContent>
                <Component {...pageProps} />
              </PageContent>
            </PageContainer>
          </PageLayout>
        </FavoritesProvider>
      </QueryProvider>
    </ApolloProvider>
  );
};

export default Layout;