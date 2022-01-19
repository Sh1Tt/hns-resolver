import Link from "next/link";

import Director from "./Director";

import Organisation from "./Organisation";

import CMS from "../../cms";

import styles from "../../styles/Footer.module.css";

const Footer = () => (
	<footer className={styles.container}>
		<div className={styles.credits}>
			{CMS.FOOTER.POWEREDBY.DIRECTORS.map( ( director, key ) => (
				<Director key={key} name={director.name} link={director.link} />
			) )}
			{CMS.FOOTER.POWEREDBY.ORGANISATIONS.map( ( organisation, key ) => (
				<Organisation key={key} name={organisation.name} link={organisation.link} svg={organisation.logo} />
			) )}
		</div>
	</footer>
);

export default Footer;