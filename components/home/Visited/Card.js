import { useContext } from "react";
import UserContext from "../../context/User";
import { hasEmoji, toAscii } from "../../../utils/Handshakename";
import Resolver from "../../../utils/Resolver";

import styles from "../../../styles/Home.module.css";

const Card = ({ handshakename, visited, no }) => {
    const { rememberVisited, forgetVisited, native } = useContext(UserContext);

    const clickHandler = e => {
        e.preventDefault();
        rememberVisited(handshakename);
        Resolver.handle(handshakename, native ? "resolve" : "bridge");
    };

    return (
        <div 
            className={styles.visitedWrapper}
            key={no}
        >
            <div    
                className={styles.visitedCard} 
                data-bg={no}
                onClick={e => clickHandler(e)}
            >
                <span>
                    {handshakename}/
                </span>
                {hasEmoji(handshakename) && <code>
                    {toAscii(handshakename)}
                </code>}
            </div>
            <input
                type="button"
                name={`forget_${handshakename}`}
                className={styles.visitedForget}
                value="x"
                onClick={e => forgetVisited(handshakename)}
            />
            <div className={styles.visitedCounter}>
                visited: <code>{visited}</code>
            </div>
        </div>
   );
};
 
export default Card;