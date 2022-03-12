import Head from "next/head";

import Image from "next/image";

import Home from "../components/home";

import CMS from "../cms";

import styles from "../styles/Home.module.css";

// import bgImg from "../public/1982394.jpg";
// import bgImg from "../public/cool-geometric-triangular-figure-neon-laser-light-great-backgrounds.jpg";
// import bgImg from "../public/wallpapersden.com_minecraft-dungeons-4k_2560x1080.jpg";
// import bgImg from "../public/wallpapersden.com_artistic-forest-4k_3840x2305.jpg"; 
import bgImg from "../public/arname_draft.png"; 
// import bgImg from "../public/shubham-dhage-IlUq1ruyv0Q-unsplash.jpg"; 
// import bgImg from "../public/zetong-li-V9x4M_y5Pqg-unsplash(og-size).jpg"; 



const Homepage = () =>
{
  const META = CMS.META,
        PAGE = CMS.CONTENT.HOME

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
      <span className="bg">
        <Image
          id="__bg"
          src={bgImg}
          alt="Background HNS Resolver"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          loading="lazy"
          placeholder="blur"
        />
      </span>
      <Home />
    </>
  )

}

export default Homepage;