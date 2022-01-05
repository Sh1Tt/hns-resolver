import Head from 'next/head'

import Nav from '../components/Nav'

import Footer from '../components/Footer'

import BASE_URL from '../config/Domain'

import styles from '../styles/Home.module.css'


const Home = () =>
{
  const PAGE = {
    TITLE: BASE_URL.replace( ".", "↗" ).split().map( char => char.toUpperCase() ).join(),
    DESC: "Browse the web using handshake names"
  }
 
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content={PAGE.DESC} />
        <meta name="title" content={PAGE.TITLE} />
        <meta property="og:title" content={PAGE.TITLE} />
        <meta property="og:description" content={PAGE.DESC} />
        <meta property="og:url" content={`https://${BASE_URL}/`} />
        <title>{PAGE.TITLE}</title>
      </Head>
      <Nav logotext={PAGE.TITLE}/>
      <header className={styles.header}>
        <h1>{PAGE.TITLE}</h1>
      </header>
      <main className={styles.main} />
      <Footer />
    </>
  )

}

export default Home