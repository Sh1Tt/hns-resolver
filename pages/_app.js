import Nav from '../components/Nav'

import '../styles/root.css'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Nav />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp