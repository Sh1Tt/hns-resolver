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
		</nav>
	);
};

export default Nav;