import Image from "next/image";
import config from "../config";
import pointerLogo from "../utils/Pointerlogo";
import Icons from "./icons_base64";

const {
	protocol,
	themecolor
} = config;

const mirror = process.env.MIRROR;
const twitterhandle = "AnotherSoftware";
const director = "another.software";

const CMS = {
	META: {
		URL: `https://${mirror}/`,
		DOMAIN: mirror,
		NAME: pointerLogo(),
		AUTHOR: `${protocol}://sh1tt.${mirror}/`,
		THEME: themecolor,
		SITE: pointerLogo(),
		TWITTER: `https://twitter.com/${twitterhandle}`,
		IMAGE: `/cutout.png`
	},
	CONTENT: {
		HOME: {
			TITLE: pointerLogo(),
			DESC: "Browse the web using handshakenames",
			HEADER: pointerLogo(),
			WEBSITES: [
				{
					name: `theshake/`,
					link: `http://theshake.${mirror}/`,
					hns: `https://theshake/`,
					icon: ``
				},
				{
					name: `niami/`,
					link: `https://niami.io/`,
					hns: `https://niami/`,
					icon: ``
				},
				{
					name: `nameserver`,
					link: `https://nameserver.pages.dev`,
					hns: `https://nameserver.pages.dev`,
					icon: ``
				},
				{
					name: `twitter`,
					link: `https://twitter.com`,
					hns: `https://twitter.com`,
					icon: ``
				},
				{
					name: `findwaldo/`,
					link: `http://www.findwaldo.${mirror}/`,
					hns: `http://www.findwaldo/`,
					icon: ``
				},
				{
					name: `hnsnetwork`,
					link: `https://hnsnetwork.com`,
					hns: `https://hnsnetwork.com`,
					icon: ``
				},
				{
					name: `blockclock/`,
					link: `http://hns.blockclock.${mirror}/`,
					hns: `https://hns.blockclock/`,
					icon: ``
				},
				{
					name: `hnschat/`,
					link: `https://hns.chat/`,
					hns: `https://hnschat/`,
					icon: ``
				},
				{
					name: `varo/`,
					link: `https://varo.io/`,
					hns: `https://varo/`,
					icon: ``
				},
				{
					name: `github`,
					link: `https://github.com/`,
					hns: `https://github.com/`,
					icon: ``
				},
				{
					name: `chatgpt`,
					link: `https://chat.openai.com/`,
					hns: `https://chat.openai.com/`,
					icon: ``
				},
				{
					name: `impervious`,
					link: `https://impervious.com/`,
					hns: `https://impervious.com/`,
					icon: ``
				},
				{
					name: `htools`,
					link: `https://htools.work/`,
					hns: `https://htools.work/`,
					icon: ``
				},
				{
					name: `RareWeave`,
					link: `https://rareweave.store/`,
					hns: `https://rareweave/`,
					icon: ``
				}
			],
		},
	},
	FOOTER: {
		DIRECTORS: [
			{
				name: `${director}`,
				link: `https://twitter.com/${twitterhandle}`,
				hns: ``,
			}
		],
		ORGANISATIONS: [
			{
				name: `Another Software`,
				link: `https://another.software/`,
				hns: ``,
				logo: <Image 
					alt="Another software logo" 
					width="24"
					height="24" 
					src={Icons.ANOTHERSOFTWARE}
				/> ,
			}
		]
	},
	ERROR: {
		LINK: "https://learn.namebase.io/starting-from-zero/how-to-access-handshake-sites"
	},
	ICONS: Icons
};

export default CMS;