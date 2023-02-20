import Head from "next/head";
import Image from "next/image";
import Home from "../components/home";
import Footer from "../components/footer";
import CMS from "../cms";

import bg0 from "../public/smoke.png";
import bg1 from "../public/dessert.jpg";
import bg2 from "../public/forest.jpg";
import bg3 from "../public/sea.jpg";
import bg4 from "../public/fjord.jpg";
import bg5 from "../public/mountain.jpg";
import bg7 from "../public/thai.jpg";
import bg8 from "../public/top.jpg";
import bg9 from "../public/trees.jpg";

const Homepage = () => {
  const META = CMS.META,
        PAGE = CMS.CONTENT.HOME;
  const backgrounds = [bg0, bg1, bg2, bg3, bg4, bg5, bg7, bg8, bg9];
  const iRand = parseInt(Math.floor(Math.random() * backgrounds.length - 1));
  return (<>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content={META.THEME} />
      <meta name="description" content={PAGE.DESC} />
      <meta name="title" content={PAGE.TITLE} />
      <meta property="og:title" content={PAGE.TITLE} />
      <meta property="og:description" content={PAGE.DESC} />
      <meta property="og:url" content={META.URL} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/cutout.png" />
      <link rel="canonical" href={META.URL} />
      <title>{PAGE.TITLE}</title>
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="78x78" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
    <span id="__background">
      <Image
        className="bg"
        id="alternate-bg"
        src={backgrounds[iRand]}
        alt="Background HNS Resolver"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        loading="lazy"
        placeholder="blur"
      />
    </span>
    <div id="__paralax">
      <Home />
      <Footer />
    </div>
  </>);
};

export default Homepage;