import { useState, useEffect } from "react";
import Hsd from "../../../utils/Hsd";

import styles from "../../../styles/Home.module.css";

const Fixed = n => n < 2 ? n.toFixed(8) : n.toFixed(2);

const Pair = ({ name, value }) =>  (
    <span className={styles.Quotes__price}>
        <span>
            {name}
        </span>
        <span>
            ${Fixed(value)}
        </span>
    </span>
);

const Exchange = () => {
    const initial = {
        state: {
            asvt: 0,
            quotes: []
        }
    };

    const [asvt, setAsvt] = useState(initial.state.asvt);
    const [quotes, setQuotes] = useState(initial.state.quotes);

    useEffect(() => {
        const getAsvtquote = async () => {
            const data = await Hsd.getAsvt();
            setAsvt(await data);
            console.log(asvt)
        };

        if (typeof window !== "undefined")
            getAsvtquote();
        
    }, []);

    useEffect(() => {
        const getExchangedata = async () => {
            const data = await Hsd.getQuotes();
            const json = await data;
            const all = [ "asvt", ...Object.keys(json) ];
            setQuotes([]);
            all.forEach(key => {
                if (key === "asvt")
                    setQuotes(prev => [...prev, <Pair name={key} value={asvt} />]);
                else
                    setQuotes(prev => [...prev, <Pair name={key.replace("-network","")} value={json[key].usd} />]);
            });
        };

        if (typeof window !== "undefined")
            getExchangedata();
    
    }, [asvt]);



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