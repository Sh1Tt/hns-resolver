import { useContext } from "react";
import UserContext from "../components/context/User";
import Head from "next/head";
import Image from "next/image";
import Home from "../components/home";
import CMS from "../cms";

const importedImages = [
  require('../public/backgrounds/vavortex/J_N_space-01.svg'),
  require('../public/backgrounds/vavortex/J_N_space-02.svg'),
  require('../public/backgrounds/vavortex/J_N_space-03.svg'),
  require('../public/backgrounds/vavortex/J_N_space-04.svg'),
  require('../public/backgrounds/vavortex/J_N_space-08.svg'),
  require('../public/backgrounds/vavortex/J_N_space-09.svg'),
  require('../public/backgrounds/vavortex/J_N_space-10.svg'),
  require('../public/backgrounds/vavortex/J_N_space-11.svg'),
];

const Desktopbackground = ({ no }) => (
  <span id="__background">
    <Image
      className="bg"
      id="alternate-bg"
      src={importedImages[no]}
      alt="Background HNS Resolver"
      layout="fill"
      objectFit="cover"
      objectPosition="center"
      loading="lazy"
    />
  </span>
);

const Homepage = () => {
  const META = CMS.META,
        PAGE = CMS.CONTENT.HOME;

  const { backgroundSelection, native } = useContext(UserContext);
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
      <Home native={native} />
    </div>
  </>);
};

export default Homepage;