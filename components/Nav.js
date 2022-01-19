import { useState } from "react";

import Logo from "./Logo";

import Resolver from "./form/Resolver";

import CMS from "../cms";

import styles from "../styles/Nav.module.css";

const Nav = () => (
	<nav className={styles.container}>
		<Logo text={CMS.META.NAME} />
		<Resolver />
	</nav>
);

export default Nav;