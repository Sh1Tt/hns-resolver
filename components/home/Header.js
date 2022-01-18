import NightModeSwitch from '../Button/NightModeSwitch'

import CMS from '../../cms'

import styles from '../../styles/Home.module.css'

import navStyles from '../../styles/Nav.module.css'

const Header = () => (
	<header className={styles.header}>
		<h1>
			{CMS.CONTENT.HOME.TITLE}
		</h1>
		<NightModeSwitch />
	</header>
)

export default Header