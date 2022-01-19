import Exchange from "./Exchange";

import styles from "../../../styles/Home.module.css";

const Widgets = () => (
    <section className={styles.section}>
        <div>
            <div className={styles.widgetsShowcase}>
                <Exchange />
            </div>
        </div>
    </section>
);

export default Widgets;