import { useState, useRef, useContext } from "react";	
import UserContext from "../context/User";
import Arweave from "arweave";

import styles from "../../styles/News.module.css";

const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    timeout: 20000,
    logging: false,
});

const sizeInKb = txt => new Blob([txt]).size / 1000;

const isSmall = txt => sizeInKb(txt) < 100;

const Transactionform  = () => {
    const { user } = useContext(UserContext);

    const [error, setError] = useState(null);
    const [size, setSize] = useState(0);

    const input = useRef(null);

    const handleSubmit = async e => {
        e.preventDefault();
        const message = input.current.value;
        if (message === "")
            return setError("Message cannot be empty");
        
        if (!isSmall(message))
            return setError("Message cannot be larger than 100kb");
    
        if (!user)
            return setError("You must be logged in to send a message");

        let tx = await arweave.createTransaction({
            data: message
        });

        tx.addTag("Content-Type", "plain/text");
        tx.addTag("AN-Type", "message");
        tx.addTag("AN-User", user);
        tx.addTag("AN-Id", new Date() * 1);

        // await window.arweaveWallet.connect([
        //     "ACCESS_ADDRESS",
        //     "ACCESS_PUBLIC_KEY",
        //     "DISPATCH"
        // ]);

        await window.arweaveWallet.dispatch(tx);
    };

    if (error)
        return (  
            <div className={styles.Transaction__error}>
                {error}
            </div>
        );

    return (
        <form
            className={[styles.Transaction__form, styles.News__message].join("")}
            autoComplete="off"
        >
            <div className={styles.Transaction__field}>
                <input
                    className={[styles.Transaction__input].join("")}
                    type="text"
                    name="message"
                    id="message"
                    placeholder="Enter your message here..."
                    ref={input}
                    onChange={e => setSize(sizeInKb(e.target.value))}
                />
            </div>
            <div className={styles.Transaction__field}>
                <button
                    type="submit"
                    onClick={handleSubmit}
                >
                    Send
                </button>
            </div>
            <div className={styles.Transaction__field}>
                <span className={styles.Transaction__size}>
                    {size}kb
                </span>
            </div>
        </form>
    );
};

export default Transactionform;