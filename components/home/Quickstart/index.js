import Icon from "./Icon";

import websites from "./manifest";

import styles from "../../../styles/Home.module.css";

const Quickstart = () => (
	<section className={styles.section}>
		<div>
			<h4 className={styles.sectionHeader}>
				Popular websites:
			</h4>
		</div>
		<div>
			<div className={styles.siteShowcase}>
				{websites.map( ( site, i ) => (
					<Icon key={i} sitename={site.name} url={site.link} svg={site.svg} />	
				) )}
			</div>
		</div>
	</section>
);

export default Quickstart;