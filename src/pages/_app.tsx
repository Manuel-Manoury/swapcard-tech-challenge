import '../styles/main.css';

import Header from '../components/layout/header';

const Layout = ({ Component, pageProps }) => {
  return (
    <>
      <Header>
        soundwarp
      </Header>
      <Component {...pageProps} />
    </>
  )
}

export default Layout