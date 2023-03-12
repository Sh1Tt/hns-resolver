import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "../../../styles/Home.module.css";

const QRcodes = () => {
    const qrcodes = useFromMemory();

    console.log("qrcodes", qrcodes)

    const [qr, setQr] = useState("");
	
    const clickHandler = e => {
        console.log(e.target);
        const options = document.querySelectorAll(`.${styles.Hns__option}`);
        options.forEach(option => {
            option.classList.remove(styles.Active);
        });
        e.target.classList.add(styles.Active);
    };

    useEffect(() => {
        if (typeof window !== "undefined")
            setQr(qrcodes[0] ? qrcodes[0].url : "");

    }, [qrcodes]);

    return (<>
        <div className={[styles.Widget__card]}>
            <div className={styles.Hns__addresses}>
                <span className={styles.Hns__wallets}>
                    {(qrcodes || []).map((qr, i) => (
                        <div
                            className={[styles.Hns__option, i === 0 ? styles.Active : ""].join(" ")}
                            key={i}
                            onClick={e => {
                                setQr(qr.url);
                                clickHandler(e);
                            }}
                        >
                            {qr.id}
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

const initialState = {
    qrcodes: [
        {id:"BTC",address:"B123",data:"B1_FD"},
        {id:"HNS",address:"H123",data:"H1_FD"},
        {id:"ETH",address:"E123",data:"E1_FD"},
        {id:"LTC",address:"L123",data:"L1_FD"},
        {id:"XMR",address:"X123",data:"X1_FD"},
        {id:"XRP",address:"R123",data:"R1_FD"}
    ]
};

const useFromMemory = () => {
    const [qrcodes, setQrcodes] = useState(initialState.qrcodes);

    useEffect(() => {
        const getData = async () => {
            const data = JSON.parse(localStorage.getItem("cool-qrcodes") || "[]");
            setQrcodes(data);
        };

        if (typeof window !== "undefined")
            getData();

    }, []);

    return qrcodes;
};

export default QRcodes;