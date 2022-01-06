import CMS from '../cms'

import styles from '../styles/Home.module.css'

const Header = () => (
	<header className={styles.header}>
		<h1>
			{CMS.CONTENT.HOME.TITLE}
		</h1>
	</header>
)

export default Header