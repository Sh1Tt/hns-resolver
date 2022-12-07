import Link from "next/link";
import CMS from "../../cms";

import styles from "../../styles/Footer.module.css";

const Customlink = ({ link, children }) => (
	<Link href={link}>
		<a className={styles.credit}>
			{children}
		</a>
	</Link>	
);

const Director = ({ name, link }) => (
	<Customlink link={link}>
		<code>
			{name}
		</code>
		<p>
			/
		</p>
	</Customlink>
);

const Organisation = ( { name, link, icon } ) => (
	<Customlink link={link}>
		<span className={[styles.Footer__organisation]}
			style={{
				"display": "inline-flex",
				"alignItems": "center",
				"justifyContent": "center"
			}}>
			<span style={{
				"width": "18px",
				"height": "18px",
				"display": "inline-flex",
				"alignItems": "center",
				"justifyContent": "center",
				"position": "relative",
			}}>
				{icon}
			</span>
			<h4>
				{name}
			</h4>
		</span>
	</Customlink>
);

const Footer = () => (
	<footer className={styles.container}>
		<div className={styles.credits}>
			{CMS.FOOTER.DIRECTORS.map((director, i) => (
				<Director key={i} name={director.name} link={director.link} />
			))}
			{CMS.FOOTER.ORGANISATIONS.map((organisation, i) => (
				<Organisation key={i} name={organisation.name} link={organisation.link} icon={organisation.logo} />
			))}
		</div>
	</footer>
);

export default Footer;