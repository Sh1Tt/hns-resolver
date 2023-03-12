import QRCode from "qrcode";
import { useState, useRef, useEffect } from "react";

import styles from "../../styles/Configure.module.css";

const store_id = {
    qrcodes: "cool-qrcodes"
};

const Qrcodes = () => {
    // const qrcodes = useQrcodes();

    // const input_wallet = qrcodes.map((_, i) => useRef(""));
    // const input_address = qrcodes.map((_, i) => useRef(""));

    // const submitHandler = async e => {
    //     e.preventDefault();

    //     const makeUrl = async address => await new Promise(resolve => {
    //         QRCode.toDataURL(address)
    //             .then(url => {
    //                 resolve(url);
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //                 resolve();
    //             });
    //     });

    //     const data = await Promise.all(
    //         qrcodes.map((_, i) => {
    //             const wallet = input_wallet[i].current.value || initialState.qrcodes[i].id;
    //             const address = input_address[i].current.value || initialState.qrcodes[i].address;
    //             return makeUrl(address)
    //                 .then(url => ({id:wallet,address,url}));
    //         })
    //     );

    //     localStorage.setItem(store_id.qrcodes, JSON.stringify(data));
    // };

    return (<>
        <div className={[styles.Qrcodes]}>
            {/* <form
                className={[styles.Form].join(" ")}
                onSubmit={submitHandler}
                autoComplete="off"
            >
                <div className={[styles.Section__title]}>
                    <h2>
                        Set QR Codes
                    </h2>
                </div>
                {qrcodes
                    .map((_, i) => <>
                        <div className={[styles.Field]}>
                            <input
                                type="text"
                                placeholder="e.g. HNS"
                                maxLength={4}
                                ref={input_wallet[i]}
                                className={[styles.Wallet]}
                            />
                            <input
                                type="text"
                                placeholder="Enter wallet address"
                                ref={input_address[i]}
                                className={[styles.Address]}
                            />
                        </div>
                    </>)}
                <button
                    type="submit"
                    onClick={submitHandler}
                >
                    Save
                </button>
            </form> */}
        </div>
    </>);
};

// hooks/useQrcodes.js
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

const useQrcodes = () => {
    const [qrcodes, setQrcodes] = useState(initialState.qrcodes)

    useEffect(() => {
        const getData = async () => {
            const data = JSON.parse(localStorage.getItem(store_id.qrcodes))
                || initialState.qrcodes;

            setQrcodes(data);
        };

        if (typeof window !== "undefined")
            getData();

    }, []);

    return qrcodes;
};


export default Qrcodes;
