import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/User";
import useBlockheight from "../../../hooks/useBlockheight";
import Loader from "../../loader/";

import styles from "../../../styles/Home.module.css";

const Hns = () => {
    const { native } = useContext(UserContext);

	const { height, loading } = useBlockheight();

    const [halving, setHalving] = useState(false);

    const [remaining, setRemaining] = useState(0);

    const [resolver, setResolver] = useState(
        <span className={[styles.Hns__dot, styles.Red].join(" ")}></span>
    );

    const nextHalving = 170000;
    
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (native)
                setResolver(<span className={[styles.Hns__dot, styles.Green].join(" ")}></span>);
            else
               setResolver(<span className={[styles.Hns__dot, styles.Red].join(" ")}></span>);

        };

        
    }, [native]);
    
    useEffect(() => {
        if (typeof window !== "undefined") {
            setHalving(height >= nextHalving);
            
            if (!halving)
                setRemaining(nextHalving - height);
        };
    }, [height]);
                

    return (<>
        <div className={[styles.Widget__card]}>
            {loading
            ? <Loader />
            : <>
                <span className={styles.Hns__title}></span>
                <span className={styles.Hns__height}>
                    Current block: {height}
                </span>
                <span className={styles.Hns__resolver}>
                    Resolver detected: {resolver}
                </span>
            </>}
        </div>
        {(!loading && !halving) && <div className={[styles.Widget__card]}>
            <span className={styles.Hns__title}></span>
            <span className={styles.Hns__height}>
                Blocks to next halving: {remaining}<br />
                <span className={styles.Hns__small}>
                    *A block takes about 10 minutes to mine.
                </span>
            </span>
        </div>}
    </>);
};

export default Hns;