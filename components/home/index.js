import Visited from "./Visited";
import Quickstart from "./Quickstart";
import { useScreensize } from "../../hooks";
import { Clock, Hns, Exchange, Handycon } from "./Widgets";
import Footer from "../footer";

import styles from "../../styles/Home.module.css";

const Section = ({ children }) => (
	<section className={styles.section}>
		{children}
	</section>
);

const Home = () => {
	const { w } = useScreensize();
	return(<>
		<header className={styles.header}>
			<h1>
				
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
							<Handycon />
						</div>
					</Section>
					<Section>
						<div className={[styles.Widget__wrapper]}>
							<Exchange />
						</div>
					</Section>
				</>}
				<Section>
					<div className={styles.Section__space}></div>
				</Section>
				<Section>
					{/* <div className={[styles.Section__two_col]}>
						<div className={[styles.Section__two_col__left]}>
							<h4 className={[styles.Section__two_col__title]}>
								News
							</h4>
							<div className={[styles.Section__two_col__content]}>

							</div>
						</div>
						<div className={[styles.Section__two_col__right]}>
							<h4 className={[styles.Section__two_col__title]}>
								Hilight
							</h4>
							<div className={[styles.Section__two_col__content]}>
							
							</div>
						</div>
					</div> */}
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
						<div className={[styles.Widget__wrapper]}>
							<Clock />
						</div>
						<div className={[styles.Widget__wrapper]}>
							<Hns />
						</div>
						<div className={[styles.Widget__wrapper]}>
							<Handycon />
						</div>
						<div className={[styles.Widget__wrapper]}>
							<Exchange />
						</div>
					</div>
				</div>
			</>}
		</div>
	</>);
};
 
export default Home;