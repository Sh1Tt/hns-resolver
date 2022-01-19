import Link from "next/link";

import styles from "../../styles/Footer.module.css";

const Customlink = ( { link, children } ) => (
	<Link href={link}>
		<a className={styles.credit}>
			{children}
		</a>
	</Link>	
);

export default Customlink;