import { useHistory } from "../../../hooks";
import Card from "./Card";

import styles from "../../../styles/Home.module.css";

const Visited = () => {
    const { names, visits } = useHistory();

    return (<>
        <div className={[styles.section__row]}>
            <h4 className={styles.section__header}>
                Top visited:
            </h4>
        </div>
        <div className={[styles.section__row]}>           
            <div className={styles.visitedShowcase}>
                {names.length > 0 ? names
                    .filter((a, i) => i <= 15)
                    .map((name, i) => (
                        <Card
                            key={`visited-${i}`}
                            handshakename={name} 
                            visited={visits[names.indexOf(name)]}
                            no={i}
                        />
                    ))
                    : <span className={styles.visitedShowcase} style={{
                        padding: "0.375em 0.75em",
                        fontSize: "0.75em",
                        color: "#9e9e9e",
                        textShadow: "0 0 0.5px black"
                    }}>
                        No websites visited yet..
                    </span>
                }
            </div>
        </div>
    </>);
};

export default Visited;