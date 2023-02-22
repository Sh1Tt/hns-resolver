import { useState, useEffect, useContext } from "react";
import UserContext from "../../context/User";
import Hsd from "../../../utils/Hsd";

import styles from "../../../styles/Home.module.css";

const Fixed = n => n < 1 ? n.toFixed(3) : n.toFixed(2);

const Exchange = () => {
    const initial = {
        state: {
            asvt: 0,
            hns: 0,
            btc: 0,
            eth: 0
        }
    };
    
    const { getQuotes } = useContext(UserContext);

    const [asvt, setAsvt] = useState(initial.state.asvt);
    const [hns, setHns] = useState(initial.state.hns);
    const [btc, setBtc] = useState(initial.state.btc);
    const [eth, setEth] = useState(initial.state.eth);

    useEffect(() => {
        const getData = async () => {
            const quote = await Hsd.getAsvt();
            setAsvt(Fixed(quote));
        };

        if (typeof window !== "undefined")
            getData();
        
    }, []);

    useEffect(() => {
        const getData = async () => {
            const currencies = await getQuotes();
            setHns(Fixed(currencies.handshake));
            setBtc(Fixed(currencies.bitcoin));
            setEth(Fixed(currencies.ethereum));
        };

        if (typeof window !== "undefined")
            getData();
        
    }, []);

    return (
        <div className={[styles.Widget__card]}>
            <span className={styles.Quotes__title}>
                Exchange Rates:
            </span>
            <div className={styles.Quotes__container}>
                <span className={styles.Quotes__price}>
                    <span>ASVT</span>
                    <span>
                        ${asvt}
                    </span>
                </span>
                <span className={styles.Quotes__price}>
                    <span>HNS:</span>
                    <span>
                        ${hns}
                    </span>
                </span>
                <span className={styles.Quotes__price}>
                    <span>BTC:</span>
                    <span>
                        ${btc}
                    </span>
                </span>
                <span className={styles.Quotes__price}>
                    <span>ETH:</span>
                    <span>
                        ${eth}
                    </span>
                </span>
            </div>
        </div>
    );
};

export default Exchange;