import Top from "./Top";
import Visited from "./Visited";
import Quickstart from "./Quickstart";
import Widgets from "./Widgets";

import styles from "../../styles/Home.module.css";

const Main = () => (
    <main className={styles.main}>
        <Top />
        <Visited />
        <Quickstart />
        <Widgets />
        <Top />
        <section className={[styles.Below]}>
            <div className={[styles.Below__container]}>
                <div className={[styles.Below__card]}>           

                </div>
            </div>
        </section>
    </main>
);

export default Main;