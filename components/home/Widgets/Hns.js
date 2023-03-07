import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/User";
import useBlockheight from "../../../hooks/useBlockheight";

import styles from "../../../styles/Home.module.css";

const Hns = () => {
    const { native } = useContext(UserContext);

	const height = useBlockheight();

    const [resolver, setResolver] = useState(
        <span className={[styles.Hns__dot, styles.Red].join(" ")}></span>
    );
    
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (native)
                setResolver(<span className={[styles.Hns__dot, styles.Green].join(" ")}></span>);
            else
               setResolver(<span className={[styles.Hns__dot, styles.Red].join(" ")}></span>);

        }
    }, [native]);

    return (<>
        <div className={[styles.Widget__card]}>
            <span className={styles.Hns__title}></span>
            <span className={styles.Hns__height}>
                Current block: {height}
            </span>
            <span className={styles.Hns__resolver}>
                Resolver detected: {resolver}
            </span>
        </div>
    </>);
};

export default Hns;

