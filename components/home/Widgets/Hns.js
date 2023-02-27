import Image from "next/image";
import { useContext, useEffect, useState, useRef } from "react";
import UserContext from "../../context/User";

import styles from "../../../styles/Home.module.css";

const Hns = () => {
    const { getBlockheight, qrcodes, native } = useContext(UserContext);

	const [height, setHeight] = useState(0);
    const [qr, setQr] = useState("");
    const [resolver, setResolver] = useState(
        <span className={[styles.Hns__dot, styles.Red].join(" ")}></span>
    );
	
    const clickHandler = e => {
        console.log(e.target);
        const options = document.querySelectorAll(`.${styles.Hns__option}`);
        options.forEach(option => {
            option.classList.remove(styles.Active);
        });
        e.target.classList.add(styles.Active);
    };

	useEffect(() => {
		const getHeight = async () => {
            const h = await getBlockheight();
            setHeight(h);
        };

        if (typeof window !== "undefined")
            getHeight();

	}, []);

    useEffect(() => {
        if (typeof window !== "undefined")
            setQr(qrcodes[0] ? qrcodes[0].qrcode : "");

    }, [qrcodes]);

    useEffect(() => {
        if (native)
            setResolver(<span className={[styles.Hns__dot, styles.Green].join(" ")}></span>);
        else
            setResolver(<span className={[styles.Hns__dot, styles.Red].join(" ")}></span>);
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
        <div className={[styles.Widget__card]}>
            <div className={styles.Hns__addresses}>
                <span className={styles.Hns__wallets}>
                    {qrcodes.map((address, i) => (
                        <div
                            className={[styles.Hns__option, i === 0 ? styles.Active : ""].join(" ")}
                            key={i}
                            onClick={e => {
                                setQr(address.qrcode);
                                clickHandler(e);
                            }}
                        >
                            {address.name}
                        </div>
                    ))}
                    <div 
                        className={styles.Hns__settings}
                        onClick={e => {
                            console.log("config")  
                        }}
                    >
                        Settings
                    </div>
                </span>
                <span className={styles.Hns__Qrcode}>
                    <Image
                        src={qr}
                        alt="qrcode"
                        width={168}
                        height={168} 
                        className={styles.Hns__stdout}
                    />
                </span>
            </div>
        </div>
    </>);
};

export default Hns;