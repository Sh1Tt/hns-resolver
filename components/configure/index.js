// import Qrcodes from "./Qrcodes";

import styles from "../../styles/Configure.module.css";

const Configure = () => {
    return (
        <div className={[styles.Outer__container]}>
            <header className={[styles.Header]}>
                <h1>
                    Settings
                </h1>
            </header>
            <main className={[styles.Main]}>
                {/* <Qrcodes /> */}
            </main>
        </div>
    );
};

export default Configure;