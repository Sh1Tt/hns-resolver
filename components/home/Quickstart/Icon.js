import Link from "next/link";

import styles from "../../../styles/Home.module.css";

const Icon = ( { sitename, url, svg } ) => (
	<Link href={url}>
		<a className={styles.siteWrapper}>
			<div className={styles.siteIcon}>
				{svg}
			</div>
			<span className={styles.siteName}>
				{sitename}
			</span>
		</a>
	</Link>
);
 
export default Icon;