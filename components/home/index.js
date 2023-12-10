import Image from "next/image";
import Link from "next/link";
import Visited from "./Visited";

import htools from "../../public/articles/htools.svg";
import hnsgrant from "../../public/articles/handshake_grant.svg";
import hnshosting from "../../public/articles/wordpress_70s.svg";
import findwaldo from "../../public/articles/findwaldo_blue.svg";


import { useScreensize } from "../../hooks";
import { Clock, Hns, Exchange, Vavo } from "./Widgets";
import Footer from "../footer";

import styles from "../../styles/Home.module.css";

const Section = ({ children }) => (
	<section className={styles.section}>
		{children}
	</section>
);

const Home = () => {
	const { w } = useScreensize();
	
	const widgets = [
		<Clock 
			key={`widget-0`} 
		/>,
		<Hns 
			key={`widget-1`}
		/>,
		<Exchange
			key={`widget-3`}
		/>,
		<Vavo
			key={`widget-4`}
		/>
	];

	const mobileWidgets = widgets;

	return(<>
		<header className={styles.header}>
			<h1>
				
			</h1>
		</header>
		<div className={[styles.Desktop__container]}>
			<main className={styles.main}>
				{/* <div className={[styles.System__interface]}>
					<span>
						{`Welcome to HNS Resolver.. current time is ${new Date().toLocaleTimeString()}. Follow the white rabbit 🐇.. `}
					</span>
					<span>
						
					</span>
				</div> */}
				<Section>
					<div className={styles.Section__space}></div>
				</Section>
				<Section>
					<Visited />
				</Section>
				<Section>
					<div className={[styles.section__row]} style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "start",
						justifyContent: "start",
						background: "rgba(16,17,23,0.5)",
						backdropFilter: "blur(5px)",
						margin: "0 auto 0 5%",
						padding: "0.675em 1.25em 0",
						width: "90%",
						maxWidth: w > 1920 ? "1720px" : "1260px",
						borderRadius: "1.5rem 1.5rem 0 0",
						textShadow: "0px 0px 5px #000",
					}}>
						<h4 className={styles.section__header}>
							Tools and resources:
						</h4>
					</div>
					<div style={{
						display: "grid",
						gridTemplateColumns: w > 1920 ? "1fr 1fr 1fr 1fr" : w > 1260 ? "1fr 1fr 1fr" : w > 720 ? "1fr 1fr" : "1fr",
						gridGap: "1.5rem",
						alignItems: "start",
						justifyItems: "start",
						textAlign: "center",
						margin: "0 auto 0 5%",
						padding: "0.675em 1.25em",
						width: "90%",
						maxWidth: w > 1920 ? "1720px" : "1260px",
						background: "rgba(16,17,23,0.5)",
						backdropFilter: "blur(5px)",
					}}>
						<div style={{
							display: "flex",
							flexDirection: "column",
						}}>
							<Link href="https://htools.work/">
								<a style={{
									borderRadius: "1.0rem",
									overflow: "hidden"
								}}>
									<Image
										src={htools}
										alt="htools"
										layout="intrinsic"
										loading="lazy"
										// placeholder="blur"
									/>
								</a>
							</Link>
							<div>
								<h2 style={{
									width: "100%",
									textAlign: "left",
									margin: "0.5rem 0",
									padding: "0.25rem 0.5rem",
								}}>
									htools.work
								</h2>
								<p style={{
									width: "100%",
									textAlign: "left",
									margin: "0",
									padding: "0.25rem 0.5rem"
								}}>
									All things handshake. A comprehensive suite for the Handshake community, offering authentication, identity management, network insights, Handshake login, Wireshark Dissector and much more..
								</p>
							</div>
						</div>
						<div style={{
							display: "flex",
							flexDirection: "column",
						}}>
							<Link href="https://hnshosting.au/">
								<a style={{
									borderRadius: "1.0rem",
									overflow: "hidden"
								}}>
									<Image
										src={hnshosting}
										alt="HNS"
										layout="intrinsic"
										loading="lazy"
										// placeholder="blur"
									/>
								</a>
							</Link>
							<div>
								<h2 style={{
									width: "100%",
									textAlign: "left",
									margin: "0.5rem 0",
									padding: "0.25rem 0.5rem",
								}}>
									hnshosting.au
								</h2>
								<p style={{
									width: "100%",
									textAlign: "left",
									margin: "0",
									padding: "0.25rem 0.5rem"
								}}>
									Simplify your Handshake domain usage with easy WordPress hosting. Secure over SSL with DANE, our fully managed service includes secure hosting, regular backups, and control over plugins and users. Currently hosting 24 WordPress sites. Free tier available with 1 GB storage.
								</p>
							</div>
						</div>
						<div style={{
							display: "flex",
							flexDirection: "column",
						}}>
							<Link href="https://github.com/opensystm/handshake-micro-grants/issues/17">
								<a style={{
									borderRadius: "1.0rem",
									overflow: "hidden"
								}}>
									<Image
										src={hnsgrant}
										alt="HNS"
										layout="intrinsic"
										loading="lazy"
										// placeholder="blur"
									/>
								</a>
							</Link>
							<div>
								<h2 style={{
									width: "100%",
									textAlign: "left",
									margin: "0.5rem 0",
									padding: "0.25rem 0.5rem",
								}}>
									handshake micro grants
								</h2>
								<p style={{
									width: "100%",
									textAlign: "left",
									margin: "0",
									padding: "0.25rem 0.5rem"
								}}>
									The Holiday Special of 200,000 HNS has been granted to Rithvik Vibhu for his stateless DANE proposaL.
								</p>
							</div>
						</div>
						<div style={{
							display: "flex",
							flexDirection: "column",
						}}>
							<Link href="http://www.findwaldo.rsvr.xyz/">
								<a style={{
									borderRadius: "1.0rem",
									overflow: "hidden"
								}}>
									<Image
										src={findwaldo}
										alt="HNS"
										layout="intrinsic"
										loading="lazy"
										// placeholder="blur"
									/>
								</a>
							</Link>
							<div>
								<h2 style={{
									width: "100%",
									textAlign: "left",
									margin: "0.5rem 0",
									padding: "0.25rem 0.5rem",
								}}>
									www.findwaldo
								</h2>
								<p style={{
									width: "100%",
									textAlign: "left",
									margin: "0",
									padding: "0.25rem 0.5rem"
								}}>
									Findwaldo helps you track down domain owners and trade, with the possibility to remain completely anonymous. Generating both hot and cold leads for domain owners and investors.
								</p>
							</div>
						</div>
					</div>
				</Section>
				{w < 1260 && widgets.map((w,i) => <>
					<Section key={`widget_${i}`}>
						<div className={[styles.Widget__wrapper]}>
							{w}
						</div>
					</Section>
				</>)}
				<Section>
					<div className={styles.Section__space}>

					</div>
				</Section>
				{w < 1260 && <>
					<Section>
						<Footer />
					</Section>
				</>}
			</main>
			{w > 1260 && <>
				<div className={[styles.aside]}>
					<div className={[styles.Widgets__container]}>
						{mobileWidgets.map((w,i) => <>
							<div key={`widget_${i}`} className={[styles.Widget__wrapper]}>
								{w}
							</div>
						</>)}
					</div>
				</div>
			</>}
		</div>
	</>);
};
 
export default Home;