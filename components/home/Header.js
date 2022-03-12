import CMS from "../../cms";

import styles from "../../styles/Home.module.css";

import navStyles from "../../styles/Nav.module.css";

import Image from "next/image";

import bridgeIcon from "../../public/redbridge.png";

import daneIcon from "../../public/blueshield.png";

const NightModeSwitch = () => {

	function toggleMode()
	{
		const darkClass = `isNight`;

		const background = document.getElementById( "__bg" );

		if ( background.classList.contains( darkClass ) )
		{
			background.classList.remove( darkClass );

			document.getElementById( "__lightmode" ).style.display = `none`;
		
			document.getElementById( "__darkmode" ).style.display = `block`;

		}
		else 
		{
			background.classList.add( darkClass );

			document.getElementById( "__darkmode" ).style.display = `none`;

			document.getElementById( "__lightmode" ).style.display = `block`;

		}

	}

	return (
		<div className={navStyles.nightMode}>
			<button onClick={e => toggleMode()} className={navStyles.nightModeSwitch}>
				<span className={navStyles.modeIcon} id="__darkmode">
					<Image alt="Dark-mode switch. Toggle Dark"  height={60} width={60} src={bridgeIcon} />
				</span>
				<span className={navStyles.modeIcon} id="__lightmode">
					<Image alt="Dark-mode switch. Toggle light"  height={50} width={50} src={daneIcon} />
				</span>
			</button>
		</div>
	);

}


const Header = () => (
	<header className={styles.header}>
		<h1>
			{CMS.CONTENT.HOME.TITLE}
		</h1>
		<NightModeSwitch />
	</header>
);

export default Header;