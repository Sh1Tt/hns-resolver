import { useContext, useState, useEffect } from "react";
import UserContext from "../../context/User";
import Card from "./Card";

import styles from "../../../styles/Home.module.css";

const Visited = () => {
    const initial = {
        state: {
            names: [],
            visits: []
        }
    };

    const { history } = useContext(UserContext);

    const [ names, setNames ] = useState([]);
    const [ visits, setVisits ] = useState([]);
    
    useEffect(() => {
        if (!history)
            return;

        setNames([...history.split(/,/)
            .map(r => r.split(":")[0])] 
            || []
        );
        
        setVisits([...history.split(/,/)
            .map(r => parseInt(r.split(":")[1]))] 
            || []
        );

    }, [history]);
    
    return (<>
        <div className={[styles.section__row]}>
            <h4 className={styles.section__header}>
                Top visited:
            </h4>
        </div>
        <div className={[styles.section__row]}>
            <div className={styles.visitedShowcase}>
                {names.length > 0&&names.filter((a, i) => i <= 15).map((name, i) => (
                    <Card
                        key={i}
                        handshakename={name} 
                        visited={visits[names.indexOf(name)]}
                        no={i}
                    />
                ))}
            </div>
        </div>
    </>);
};

export default Visited;