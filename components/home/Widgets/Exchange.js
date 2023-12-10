import { useState, useEffect } from "react";
import Loader from "../../loader/";
import Hsd from "../../../utils/Hsd";

import styles from "../../../styles/Home.module.css";

const Fixed = n => n < 2 ? n.toFixed(8) : n.toFixed(2);

const Quote = ({ token, value, i }) => typeof value === "number" ? (
    <span 
        className={styles.Quotes__price}
        key={i}
    >
        <span>
            {token}
        </span>
        <span style={{
            fontSize: "1rem",
        }}>
            ${Fixed(value)}
        </span>
    </span>
) : "";

const Exchange = () => {
    const [asvt, setAsvt] = useState(0);
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getAsvtquote = async () => {
            const data = await Hsd.getAsvt();
            setAsvt(await data);
        };

        if (typeof window !== "undefined")
            getAsvtquote();

    }, []);

    useEffect(() => {
        const getExchangedata = async () => {
            const data = await Hsd.getQuotes();
            const json = await data;
            const all = ["asvt", ...Object.keys(json)];
            setQuotes([]);
            all.forEach((key,i) => {
                const token = key.replace("-network", "");
                if (token === "asvt")
                    setQuotes(prev => [...prev, <Quote key={i} i={i} token={token} value={asvt} />]);
                else
                    setQuotes(prev => [...prev, <Quote key={i} i={i} token={token.replace("-network", "")} value={json[key].usd} />]);
            });
            setLoading(false);
        };

        if (typeof window !== "undefined"
            && asvt > 0 
        )
            getExchangedata();

    }, [asvt]);

    if (loading)
        return (<>
            <div className={[styles.Widget__card]}>
                <Loader />
            </div>
        </>);

    return (
        <div className={[styles.Widget__card]}>
            <span className={styles.Quotes__title}>
                Exchange Rates:
            </span>
            <div className={styles.Quotes__container}>
                {quotes}
            </div>
        </div>
    );
};

export default Exchange;