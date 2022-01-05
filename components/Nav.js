import Logo from './Logo'

import Resolver from './form/Resolver'

import styles from '../styles/Home.module.css'

const Nav = ( { logotext } ) => (
	<nav className={styles.nav}>
		<Logo text={logotext} />
		<Resolver />
	</nav>
)

export default Nav