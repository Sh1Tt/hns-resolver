import Image from "next/image";
import { useState } from "react";
import Logo from "./Logo";
import Resolver from "./form/Resolver";
import CMS from "../cms";

import styles from "../styles/Nav.module.css";

const Nav = () => {
	const initialState = {
		menu: false
	};
	const [ menu, setMenu ] = useState(initialState.menu);
	const toggleMenu = () => {
		setMenu(!menu);
		console.log(menu);
	};
	const { NAME } = CMS.META;
	return (
		<nav className={styles.Container}>
			<Logo text={NAME} />
			<Resolver />
			<div className={[styles.Menu__container].join(` `)}>
				<span
					className={[styles.Button, styles.Wrapper__icon].join(` `)}
					onClick={toggleMenu}
				>
					<Image 
						width={24} 
						height={24} 
						alt="Menu icon 58x58" 
						src={CMS.ICONS.MENU} 
					/>
				</span>
				<div className={[styles.Menu, styles.Menu__options, !menu?'closed':''].join(` `)}>
					<div className={[styles.Menu__submenu].join(` ` )}>
						<span className={[styles.Menu__option, styles.Menu__title].join(` `)}>
							Options
						</span>
						<span className={[styles.Menu__option, styles.Menu__path].join(` `)}>
							First option
						</span>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Nav;