import Head from 'next/head'

import Header from '../components/Header'

import Main from '../components/Main'

import Footer from '../components/Footer'

import CMS from '../cms/'

import styles from '../styles/Home.module.css'

const Home = () =>
{
  const PAGE = CMS.CONTENT.HOME, META = CMS.META

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={META.THEME} />
        <meta name="description" content={PAGE.DESC} />
        <meta name="title" content={PAGE.TITLE} />
        <meta property="og:title" content={PAGE.TITLE} />
        <meta property="og:description" content={PAGE.DESC} />
        <meta property="og:url" content={META.URL} />
        <meta property="dc:creator" content={META.AUTHOR} />
        <title>{PAGE.TITLE}</title>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="78x78" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Header />
      <Main />
      <Footer />
    </>
  )

}

export default Home