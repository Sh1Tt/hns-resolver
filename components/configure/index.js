import {  useRef, useReducer } from "react";

import styles from "../../styles/Configure.module.css";

const initialState = {
    qrcodes: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case "set_qrcodes":

            return {
                ...state,
                qrcodes: action.payload
            };
        default:
            return state;
    }
};

const Configure = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const input_wallet = [useRef(""), useRef(""), useRef(""), useRef(""), useRef(""), useRef("")];
    const input_address = [useRef(""), useRef(""), useRef(""), useRef(""), useRef(""), useRef("")];
    
    const submitHandler = e => {
        e.preventDefault();
        const qrcodes = [
            {
                token: input_wallet_0.current.value,
                address: input_address_0.current.value
            },
            {
                token: input_wallet_1.current.value,
                address: input_address_1.current.value
            },
            {
                token: input_wallet_2.current.value,
                address: input_address_2.current.value
            },
            {
                token: input_wallet_3.current.value,
                address: input_address_3.current.value
            },
            {
                token: input_wallet_4.current.value,
                address: input_address_4.current.value
            },
            {
                token: input_wallet_5.current.value,
                address: input_address_5.current.value
            }
        ];
        window.localStorage.setItem("qrcodes", JSON.stringify(qrcodes));
        dispatch({ type: "set_qrcodes", payload: qrcodes });
    };

    return (
        <div className={[styles.Outer__container]}>
            <header className={[styles.Header]}>
                <h1>
                    Settings
                </h1>
            </header>
            <main className={[styles.Main]}>
                <div className={[styles.Qrcodes]}>
                    <form
                        className={[styles.Form].join(" ")}
                        onSubmit={submitHandler}
                        autoComplete="off"
                    >
                        <div className={[styles.Section__title]}>
                            <h2>
                                Set QR Codes
                            </h2>
                        </div>
                        {Array(6).fill()
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
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Configure;