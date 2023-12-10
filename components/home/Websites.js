import Link from "next/link";
import { useContext } from "react";
import CMS from "../../cms";
import UserContext from "../context/User";

const { WEBSITES } = CMS.CONTENT.HOME;

import styles from "../../styles/Home.module.css";

const Website = ({ sitename, url, svg }) => (
    <Link href={url}>
        <a className={styles.siteWrapper}>
            <div className={styles.siteWebsite}>
                {svg}
            </div>
            <span className={styles.siteName}>
                {sitename}
            </span>
        </a>
    </Link>
);

const Websites = () => {
    const { native } = useContext(UserContext);
    return (<>
        <section className={styles.section}>
            <div className={[styles.section__row]}>
                <h4 className={styles.section__header}>
                    Popular websites:
                </h4>
            </div>
            <div className={[styles.section__row]}>
                <div className={styles.siteShowcase}>
                    {WEBSITES.map((site, i) => (
                        <Website key={i} sitename={site.name} url={native?site.hns:site.link} svg={site.svg} />
                    ))}
                </div>
            </div>
        </section>
    </>);
};

export default Websites;