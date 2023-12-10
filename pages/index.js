import { useContext } from "react";
import UserContext from "../components/context/User";
import Head from "next/head";
import Image from "next/image";
import Home from "../components/home";
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

import space01 from "../public/vavortex/J_N_space-01.svg";
import space02 from "../public/vavortex/J_N_space-02.svg";
import space03 from "../public/vavortex/J_N_space-03.svg";
import space04 from "../public/vavortex/J_N_space-04.svg";
import space08 from "../public/vavortex/J_N_space-08.svg";
import space09 from "../public/vavortex/J_N_space-09.svg";
import space10 from "../public/vavortex/J_N_space-10.svg";
import space11 from "../public/vavortex/J_N_space-11.svg";

const Desktopbackground = ({ no }) => {
  const backgrounds = [
    space01,
    space02,
    space03,
    space04,
    space08,
    space09,
    space10,
    space11
  ];

  const r = no || Math.floor(Math.random() * backgrounds.length);
  
  return (
    <span id="__background">
      <Image
        className="bg"
        id="alternate-bg"
        src={backgrounds[r]}
        alt="Background HNS Resolver"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        loading="lazy"
        // placeholder="blur"
      />
    </span>
  );
};

const Homepage = () => {
  const META = CMS.META,
        PAGE = CMS.CONTENT.HOME;

  const { backgroundSelection } = useContext(UserContext);
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
    <Desktopbackground no={backgroundSelection} />
    <div id="__paralax">
      <Home />
    </div>
  </>);
};

export default Homepage;