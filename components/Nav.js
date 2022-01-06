import Logo from './Logo'

import Resolver from './form/Resolver'

import CMS from '../cms'

import styles from '../styles/Home.module.css'

const Nav = () => (
	<nav className={styles.nav}>
		<Logo text={CMS.META.NAME} />
		<Resolver />
	</nav>
)

export default Nav