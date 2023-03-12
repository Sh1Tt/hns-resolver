import Visited from "./Visited";
import Quickstart from "./Quickstart";
import { useScreensize } from "../../hooks";
import { Clock, Hns, Exchange, Qrcode } from "./Widgets";
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
		<Qrcode 
			key={`widget-2`}
		/>,
		<Exchange
			key={`widget-3`}
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
				<Section>
					<div className={styles.Section__space}></div>
				</Section>
				<Section>
					<Visited />
				</Section>
				<Section>
					<Quickstart />
				</Section>
				{w < 1260 && widgets.map((w,i) => <>
					<Section key={`widget_${i}`}>
						<div className={[styles.Widget__wrapper]}>
							{w}
						</div>
					</Section>
				</>)}
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