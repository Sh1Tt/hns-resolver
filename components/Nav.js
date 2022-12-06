import Image from "next/image";
import Logo from "./Logo";
import Resolver from "./form/Resolver";
import CMS from "../cms";

import styles from "../styles/Nav.module.css";

const Nav = () => {
	const { NAME } = CMS.META;
	return (
		<nav className={styles.Container}>
			<Logo text={NAME} />
			<Resolver />
			<span 
				className={[styles.Button+" "+styles.Menu]}
				onClick={e => {
					console.log("toggle menu");
				}}
			>
				<Image width={24} height={24} alt="Menu icon 58x58" src={CMS.ICONS.MENU} />
			</span>
		</nav>
	);
};

export default Nav;