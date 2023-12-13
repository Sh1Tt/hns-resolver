import Visited from "./Visited";
import Lenks from "./Lenks";
import { useScreensize } from "../../hooks";
import { Clock, Hns, Exchange, Vavo } from "./Widgets";

import styles from "../../styles/Home.module.css";

const Section = ({ children }) => (
	<section className={styles.section}>
		{children}
	</section>
);

const Home = props => {
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
				<div className={[styles.System__interface]}>
					<span>
						{`Welcome to HNS Resolver.. Follow the white rabbit 🐇.. `}
					</span>
					<span>
						
					</span>
				</div>
				<Section>
					<div className={styles.Section__space}></div>
				</Section>
				<Section>
					<Visited />
				</Section>
				<Section>
					<Lenks
						width={w}
						native={props.native}
					/>
				</Section>
				{/* mobile appends all widgets into their own sections*/}
				{w <= 1260 && widgets.map((_,i) => <>
					<Section key={`widget_${i}`}>
						<div className={[styles.Widget__wrapper]}>
							{_}
						</div>
					</Section>
				</>)}
				{/* End mobile widgets */}
			</main>
			{/* Start desktop widgets in an aside div if innerscreensize width is less then 1260 */}
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
			{/* End desktop widgets */}
		</div>
	</>);
};
 
export default Home;