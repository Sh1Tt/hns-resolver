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
			QUICKSTART: [
				{
					name: `theshake/`,
					link: `http://theshake.${mirror}/`,
					icon: ``
				},
				{
					name: `x/piring`,
					link: `http://x.${mirror}/piring`,
					icon: ``
				},
				{
					name: `niami/`,
					link: `https://niami.io/`,
					icon: ``
				},
				{
					name: `nameserver`,
					link: `https://nameserver.pages.dev`,
					icon: ``
				},
				{
					name: `twitter`,
					link: `https://twitter.com`,
					icon: ``
				},
				{
					name: `findwaldo/`,
					link: `http://www.findwaldo.${mirror}/`,
					icon: ``
				},
				{
					name: `hnsnetwork`,
					link: `https://hnsnetwork.com`,
					icon: ``
				},
				{
					name: `blockclock/`,
					link: `http://hns.blockclock.${mirror}/`,
					icon: ``
				},
				{
					name: `hnschat/`,
					link: `https://hns.chat/`,
					icon: ``
				},
				{
					name: `varo/`,
					link: `https://varo.io/`,
					icon: ``
				},
				{
					name: `github`,
					link: `https://github.com/`,
					icon: ``
				},
				{
					name: `chatgpt`,
					link: `https://chat.openai.com/`,
					icon: ``
				},
				{
					name: `hnssearch/`,
					link: `https://hnssearch.io/`,
					icon: ``
				},
				{
					name: `impervious`,
					link: `https://impervious.com/`,
					icon: ``
				},
				{
					name: `nftsarestupid`,
					link: `https://nftsarestupid.com/`,
					icon: ``
				}
			]
		},
		NEWS: {
			TITLE: "Another News | Handshake",
			DESC: "An arweave based messaging service for the Handhsake community",
			HEADER: "Another News",
		},
		GHOSTBUDDY: {
			TITLE: "Ghostbuddy | Handshake",
			DESC: "An handshake based gaming facility for GhostbuddyNFT holders",
			HEADER: "Ghostbuddy",
		},
		GAME: {
			TITLE: "Findwaldo - The Game v1.0 | Handshake",
			DESC: "An handshake based game with Findwaldo as the main character",
			HEADER: "Findwaldo - The Game",
		},
		HNSCHAT: {
			TITLE: "HNS Chat | Handshake",
			DESC: "An handshake based messaging service for the Handhsake community",
			HEADER: "HNS Chat",
		},
		RAREWEAVE: {
			TITLE: "rareWeave release countdown",
			DESC: "A simple countdown to the rareWeave release",
			HEADER: "rareWeave release",
		}
	},
	FOOTER: {
		DIRECTORS: [
			{
				name: `${director}`,
				link: `https://twitter.com/${twitterhandle}`,
			}
		],
		ORGANISATIONS: [
			{
				name: `Another Software`,
				link: `https://another.software/`,
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