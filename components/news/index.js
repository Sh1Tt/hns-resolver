import { useArDBTransactions } from "../../hooks";
import Transactionform from "../form/Transaction";
import CMS from "../../cms";

import styles from "../../styles/News.module.css";

const News = () => {
    const { transactions, isLoading, error } = useArDBTransactions();

    return (
        <>
            <header className={[styles.Header]}>
                <h1>
                    <span className={[styles.Color__hilight].join("")}>A</span>NOTHE<span className={[styles.Color__hilight].join("")}>R</span>
                    &nbsp;
                    NEWS
                </h1>
                <span className="News__description">
                    {CMS.CONTENT.NEWS.DESC}
                </span>
            </header>  
            <div className={[styles.Desktop__container]}>
                <main className={styles.Main}>
                    <div className={[styles.News__messages].join("")}>
                        {isLoading && <div className={[styles.News__item].join("")}>Loading...</div>}
                        {error && <div className={[styles.News__item].join("")}>Error: {error}</div>}
                        {transactions && transactions.map((transaction, index) => (
                            <div className={[styles.News__message].join("")} key={index}>
                                <span>
                                    {transaction.message}
                                </span>
                                {transactions[index].tags.map((_t,_i) => (<>
                                    <span key={_i}>
                                        {_t.name === "AN-Id" && <>
                                            {new Date(_t.value)}
                                        </>}
                                    </span>
                                    {_t.name === "AN-User" && <>
                                        <span>
                                            {_t.value}
                                        </span>
                                    </>}
                                </>))}

                            </div>
                        ))}
                        <Transactionform />
                    </div>
                </main>
                <aside className={styles.Aside}>

                </aside>
            </div>
        </>
    );
};

export default News;