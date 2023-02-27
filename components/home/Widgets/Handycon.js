// https://www.airmeet.com/e/10dfe960-a752-11ed-9417-c913a70054cb
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

import styles from "../../../styles/Home.module.css";

const handycon_start = new Date(2023, 2, 9, 6, 0, 0,);

const Handycon = () => {
    const initial = {
        state: {
            difference: "00 : 00 : 00 : 00"
        },
        ref: {
            timer: null
        }
    };
    const [difference, setDifference] = useState(initial.state.difference);
    
    const timer = useRef(initial.ref.timer);

    useEffect(() => {
        const dd = n => n < 10 ? `0${n}` : n;
        timer.current = setInterval(() => {
            const now = new Date();
            const diff = handycon_start - now;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            const format = `${dd(days)} : ${dd(hours)} : ${dd(minutes)} : ${dd(seconds)}`;
            setDifference(format);
        }, 1 * 1_000);
        return () => {
            clearInterval(timer.current);
        };
    }, []);

    return (
        <div key="0" className={[styles.Widget__card]}>
            <span className={styles.Handycon__title}>
                Handycon 2023
            </span>
            <div className={styles.Handycon_countdown}>
                {difference.split(" ")
                    .map((d, i) => <>
                        <div key={i}>
                            {d}
                        </div>
                    </>)
                }
            </div>
            <div className={styles.Handycon_legenda}>
                {[
                    "dd", " ", "hh", " ", "mm", " ", "ss"
                ].map((d, i) => <>
                    <div key={i}>
                        {d}
                    </div>
                </>)}
            </div>
            <div className={styles.Handycon__register}>
                <Link key="link0" href="https://www.airmeet.com/e/10dfe960-a752-11ed-9417-c913a70054cb">
                    <a className={[styles.Handycon_button].join(" ")}>
                        Register for event
                    </a>
                </Link>
                <Link key="link1" href="https://2023.handycon.xyz/">
                    <a className={[styles.Handycon_website].join(" ")}>
                        Handycon 2023 website
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default Handycon;