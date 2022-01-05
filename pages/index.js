import Head from 'next/head'

import Nav from '../components/Nav'

import Footer from '../components/Footer'

import styles from '../styles/Home.module.css'

const PAGE = {
  TITLE: "HNS↗IS",
  DESC: "Resolve your handshake (domain)"
}

const Home = () => (
  <>
    <Head>
      <title>{PAGE.TITLE}</title>
      <meta name="title" content={PAGE.TITLE} />
      <meta name="description" content={PAGE.DESC} />
    </Head>
    <Nav logotext={PAGE.TITLE}/>
    <header className={styles.header}>
      <h1>{PAGE.TITLE}</h1>
    </header>
    <main className={styles.main} />
    <Footer />
  </>
)

export default Home