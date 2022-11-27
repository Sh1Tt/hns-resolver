import Link from "next/link";
import Director from "./Director";
import Organisation from "./Organisation";
import CMS from "../../cms";

import styles from "../../styles/Footer.module.css";

const Footer = () => (
	<footer className={styles.container}>
		<div className={styles.credits}>
			{CMS.FOOTER.DIRECTORS.map((director, i) => (
				<Director key={i} name={director.name} link={director.link} />
			))}
			{CMS.FOOTER.ORGANISATIONS.map((organisation, i) => (
				<Organisation key={i} name={organisation.name} link={organisation.link} svg={organisation.logo} />
			))}
		</div>
	</footer>
);

export default Footer;