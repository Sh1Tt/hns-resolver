import useCountdown from "../../hooks/useCountdown";

import styles from "../../styles/Rareweave.module.css";

const RareWeave = () => {
    const countdown = useCountdown({
        target: "2023-04-15T00:00:00Z"
    });

    return (<>
        <div className={[styles.Wrapper].join(" ")}>
            <div className={[styles.Container__hero].join(" ")}>
                <span className={[styles.Header].join(" ")}>
                    <h1>
                        RareWeave
                    </h1>
                </span>
                <span className={[styles.Description].join(" ")}>
                    Arweave’s first liquid NFT marketplace
                </span>
            </div>
            <div className={[styles.Container__countdown].join(" ")}>
                <div className={[styles.Countdown__item].join(" ")}>
                    <span className={[styles.Countdown__value].join(" ")}>{countdown.days}</span>
                    <span className={[styles.Countdown__label].join(" ")}>Days</span>
                </div>
                <div className={[styles.Countdown__item].join(" ")}>
                    <span className={[styles.Countdown__value].join(" ")}>{countdown.hours}</span>
                    <span className={[styles.Countdown__label].join(" ")}>Hours</span>
                </div>
                <div className={[styles.Countdown__item].join(" ")}>
                    <span className={[styles.Countdown__value].join(" ")}>{countdown.minutes}</span>
                    <span className={[styles.Countdown__label].join(" ")}>Minutes</span>
                </div>
                <div className={[styles.Countdown__item].join(" ")}>
                    <span className={[styles.Countdown__value].join(" ")}>{countdown.seconds}</span>
                    <span className={[styles.Countdown__label].join(" ")}>Seconds</span>
                </div>
            </div>
        </div>
    </>);
};

export default RareWeave;