import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "../../../styles/Home.module.css";

const QRcodes = () => {
    const qrcodes = [
        {
            name: "btc",
            address: "bc19886sd8d87vfd7658d7vf76d4e76vdg90vhs986f58",
            qrcode: ""
        },
        {
            name: "eth",
            address: "0x19886sd8d87vfd7658d7vf76d4e76vdg90vhs986f58",
            qrcode: ""
        },
        {
            name: "hns",
            address: "hs19886sd8d87vfd7658d7vf76d4e76vdg90vhs986f58",
            qrcode: ""
        },
        {
            name: "btc",
            address: "bc19886sd8d87vfd7658d7vf76d4e76vdg90vhs986f58",
            qrcode: ""
        },
        {
            name: "eth",
            address: "0x19886sd8d87vfd7658d7vf76d4e76vdg90vhs986f58",
            qrcode: ""
        },
        {
            name: "hns",
            address: "hs19886sd8d87vfd7658d7vf76d4e76vdg90vhs986f58",
            qrcode: ""
        }
    ];

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
            setQr(qrcodes[0] ? qrcodes[0].qrcode : "");

    }, [qrcodes]);

    return (<>
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

export default QRcodes;