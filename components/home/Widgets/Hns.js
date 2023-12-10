import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/User";
import useBlockheight from "../../../hooks/useBlockheight";
import Loader from "../../loader/";

import styles from "../../../styles/Home.module.css";

const Reddot = () => (
    <span className={[styles.Hns__dot, styles.Red].join(" ")}></span>
);

const Greendot = () => (
    <span className={[styles.Hns__dot, styles.Green].join(" ")}></span>
);

const isClient = () => typeof window !== undefined;

const Hns = () => {
    const { native } = useContext(UserContext);

	const { height, loading } = useBlockheight();

    const [isAnniversary, setIsAnniversary] = useState(false);

    const [remaining, setRemaining] = useState(0);

    const [resolver, setResolver] = useState(
        Reddot()
    );

    const anniversary = 210240;
    
    useEffect(() => {
        if (isClient())
            setResolver(native ? Greendot()
                : Reddot()
            );

    }, [native]);
    
    useEffect(() => {
        if (isClient()) {
            setIsAnniversary(height >= anniversary);
            
            if (!isAnniversary)
                setRemaining(anniversary - height);
        };
    }, [height]);
                
    return (<>
        <div className={[styles.Widget__card]}>
            {loading
            ? <Loader />
            : <>
                <span className={styles.Hns__title}></span>
                <span className={styles.Hns__height}>
                    Current block: {height} <br />
                    <span style={{ fontSize: "0.8rem", color: "#999" }}>
                        *A block takes about 10 minutes
                    </span><br />
                    {(!loading && !isAnniversary) && <span style={{ fontSize: "0.8rem" }}>
                        Blocks to 4th anniversary: {remaining} {`(~${((remaining * 10 / 60) / 24).toFixed(0)} days)`}
                    </span>}
                </span>
                <span className={styles.Hns__resolver}>
                    Resolver detected:&nbsp;{resolver}
                </span>
            </>}
        </div>
    </>);
};

export default Hns;