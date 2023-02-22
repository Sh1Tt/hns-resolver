import { useState, useEffect, useContext } from "react";
import UserContext from "../context/User";
import Visited from "./Visited";
import Quickstart from "./Quickstart";
import { Clock, Hns, Exchange, Handycon } from "./Widgets";
import Footer from "../footer";

import styles from "../../styles/Home.module.css";

const Section = ({ children }) => (
	<section className={styles.section}>
		{children}
	</section>
);

const Home = () => {
	const initial = {
		state: {
			w: 0,
			y: 0,
		}
	};

	const { getBlockheight } = useContext(UserContext);

	const [w, setW] = useState(initial.state.w);
	const [y, setY] = useState(initial.state.y);
	
	useEffect(() => {
		if (typeof window === "undefined")
			return;

		setW(window.innerWidth);
		document.addEventListener("resize", () => {
			setW(window.innerWidth);
		});
		return () => {
			document.removeEventListener("resize", () => {
				setW(window.innerWidth);
			});
		};
	}, []);

	useEffect(() => {
		if (typeof window === "undefined")
			return;

		setY(window.scrollY);
		document.addEventListener("scroll", () => {
			setY(window.scrollY);
			console.log(y);
		});
		return () => {
			document.removeEventListener("scroll", () => {
				setY(window.scrollY);
				console.log(y);
			});
		};
	}, []);
		
	return(<>
		<header className={styles.header}>
			<h1>
				{/* {CMS.CONTENT.HOME.TITLE} */}
			</h1>
		</header>
		<div className={[styles.Desktop__container]}>
			<main className={styles.main}>
				<Section>
					<div className={styles.Section__space}></div>
				</Section>
				<Section>
					<Visited />
				</Section>
				<Section>
					<Quickstart />
				</Section>
				{w < 1260 && <>
					<Section>
						<div className={[styles.Widget__wrapper]}>
							<Clock />
						</div>
					</Section>
					<Section>
						<div className={[styles.Widget__wrapper]}>
							<Hns />
						</div>
					</Section>
					<Section>
						<div className={[styles.Widget__wrapper]}>
							<Exchange />
						</div>
					</Section>
					<Section>
						<div className={[styles.Widget__wrapper]}>
							<Handycon />
						</div>
					</Section>
					<Section>
						<Footer />
					</Section>
				</>}
			</main>
			{w > 1260 && <>
				<div className={[styles.aside]}>
					<div className={[styles.Widgets__container]}>
						<div className={[styles.Widget__wrapper]}>
							<Clock />
						</div>
						<div className={[styles.Widget__wrapper]}>
							<Hns />
						</div>
						<div className={[styles.Widget__wrapper]}>
							<Exchange />
						</div>
						<div className={[styles.Widget__wrapper]}>
							<Handycon />
						</div>
					</div>
				</div>
			</>}
		</div>
	</>);
};
 
export default Home;