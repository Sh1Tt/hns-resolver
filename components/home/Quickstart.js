import Link from "next/link";
import CMS from "../../cms";

import styles from "../../styles/Home.module.css";

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

const Quickstart = () => {
    const websites = CMS.CONTENT.HOME.QUICKSTART;   
    return (<>
        <section className={styles.section}>
            <div className={[styles.section__row]}>
                <h4 className={styles.section__header}>
                    Popular websites:
                </h4>
            </div>
            <div className={[styles.section__row]}>
                <div className={styles.siteShowcase}>
                    {websites.map( ( site, i ) => (
                        <Icon key={i} sitename={site.name} url={site.link} svg={site.svg} />	
                    ) )}
                </div>
            </div>
        </section>
    </>);
};

export default Quickstart;