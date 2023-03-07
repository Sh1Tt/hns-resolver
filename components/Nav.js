import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import Resolver from "./form/Resolver";
import CMS from "../cms";

import styles from "../styles/Nav.module.css";
import hns_logo from "../public/android-chrome-192x192.png";

const mirror = process.env.MIRROR;

const Nav = () => {
	const [menu, setMenu] = useState(false);
	const toggleMenu = () => {
		setMenu(!menu);
	};
	return (
		<nav id="__nav">
			<Logo text={mirror} />
			<Resolver />
			<div className={[styles.Menu__container].join(` `)}>
				<span
					className={[styles.Button, styles.Wrapper__icon].join(` `)}
					onClick={toggleMenu}
				>
					<Image 
						width={18} 
						height={18} 
						alt="Menu icon 58x58" 
						src={CMS.ICONS.MENU} 
					/>
				</span>
				<div 
					className={[styles.Menu, styles.Menu__options, !menu?'closed':''].join(` `)}
					onMouseLeave={toggleMenu}	
				>
					<div className={[styles.Menu__submenu].join(` ` )}>
						<div className={[styles.Menu__option, styles.Menu__title].join(` `)}>
							<span className={[styles.Menu__option_icon].join(` `)}>
								<Image width={16} height={16} alt="icon <description_here>" src={hns_logo} />
							</span>
							<span className={[styles.Menu__option_text].join(` `)}>
								Options
							</span>
						</div>
						<div className={[styles.Menu__option, styles.Menu__path].join(` `)}>
							<span className={[styles.Menu__option_icon].join(` `)}>
								{/* <Image width={16} height={16} alt="icon <description_here>" src={hns_logo} /> */}
							</span>
							<Link href="/configure">
								<a className={[styles.Menu__option_text].join(` `)}>
									Settings
								</a>
							</Link>
							<span className={[styles.Menu__option_btn].join(` `)}>
								
							</span>
						</div>
						{/* <div className={[styles.Menu__option, styles.Menu__path].join(` `)}>
							<span className={[styles.Menu__option_icon].join(` `)}>
								
							</span>
							<label htmlFor="dark_mode" className={[styles.Menu__option_text].join(` `)}>
								Dark mode
							</label>
							<span className={[styles.Menu__option_btn].join(` `)}>
								<input id="dark_mode" type="checkbox" />
							</span>
						</div>
						<div className={[styles.Menu__option, styles.Menu__path].join(` `)}>
							<span className={[styles.Menu__option_icon].join(` `)}>
								
							</span>
							<label htmlFor="use_gateway" className={[styles.Menu__option_text].join(` `)}>
								Use gateway
							</label>
							<span className={[styles.Menu__option_btn].join(` `)}>
								<input id="use_gateway" type="checkbox" />
							</span>
						</div> */}
						<div className={[styles.Menu__option, styles.Menu__title].join(` `)}>
							<span className={[styles.Menu__option_icon].join(` `)}>
								{/* <Image width={16} height={16} alt="icon <description_here>" src={hns_logo} /> */}
							</span>
							<span className={[styles.Menu__option_text, styles.Menu__unavailable].join(` `)}>
								{/* {user?user:`Log in`} */}Log in
							</span>
						</div>
						
						<div className={[styles.Menu__option, styles.Menu__path].join(` `)}>
							<span className={[styles.Menu__option_icon].join(` `)}>
								{/* <Image width={16} height={16} alt="icon <description_here>" src={hns_logo} /> */}
							</span>
							<Link href="/">
								<a className={[styles.Menu__option_text].join(` `)}>
									Close
								</a>
							</Link>
							<span className={[styles.Menu__option_btn].join(` `)}>
								
							</span>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Nav;