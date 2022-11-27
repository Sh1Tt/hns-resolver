import { useContext, useState, useEffect } from "react";
import UserContext from "../../context/User";
import Card from "./Card";
import CMS from "../../../cms";

import styles from "../../../styles/Home.module.css";

const Visited = () => {
    const { history } = useContext(UserContext);
    console.log(history);

    const [ names, setNames ] = useState([]);
    const [ visits, setVisits ] = useState([]);
    
    useEffect(() => {
        if (!history)
            return;
        setNames([...history.split(/,/).map(r => r.split(":")[0])] || []);
        setVisits([...history.split(/,/).map(r => parseInt(r.split(":")[1]))] || []);
    }, [history]);
    
    return (
        <section className={styles.section}>
            <div>
                <h4 className={styles.sectionHeader}>
                    Top visited:
                </h4>
            </div>
            <div>
                <div className={styles.visitedShowcase}>
                    {names.length > 0&&names.filter((a, i) => i <= 15).map((name, i) => (
                        <Card
                            handshakename={name} 
                            visited={visits[names.indexOf(name)]}
                            no={i}
                        />
                   ))}
                </div>
            </div>
        </section>
   );
}

export default Visited;