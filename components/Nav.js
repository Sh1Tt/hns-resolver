import Logo from './Logo'

import Resolver from './form/Resolver'

import CMS from '../cms'

import styles from '../styles/Nav.module.css'

function toggleMode()
{
	const classId = `colorfull`

	const app = document.getElementById( '__next' )

	if ( app.classList.contains( classId ) )
	{
		app.classList.remove( classId )

	}
	else 
	{
		app.classList.add( classId )

	}

}

const Nav = () => (
	<nav className={styles.container}>
		<Logo text={CMS.META.NAME} />
		<Resolver />
		<input 
			className={styles.modeBtn}
			type="button"
			onClick={e => toggleMode()}
		/>
	</nav>
)

export default Nav