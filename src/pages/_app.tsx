import { ApolloProvider } from '@apollo/client'; 

import '../styles/main.css';

import MusicBrainzClient from '../api/MusicBrainzClient';

import Header from '../components/layout/header';

const Layout = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={MusicBrainzClient}>
      <Header>
        soundwarp
      </Header>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default Layout