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
                {names.length > 0 && 
                    names.filter((a, i) => i <= 15)
                        .map((name, i) => (
                            <Card
                                key={`visited-${i}`}
                                handshakename={name} 
                                // visited={visits[names.indexOf(name)]}
                                visited={visits[i]}
                                no={i}
                            />
                ))}
            </div>
        </div>
    </>);
};

export default Visited;