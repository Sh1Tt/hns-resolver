import Logo from './Logo'

import Resolver from './form/Resolver'

import styles from '../styles/Home.module.css'

export default ( { logotext } ) => (
	<nav className={styles.nav}>
		<Logo text={logotext} />
		<Resolver />
	</nav>
)