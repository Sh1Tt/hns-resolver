import Link from "next/link";
import { useContext } from "react";
import punycode from "punycode";
import UserContext from "../../context/User";
import config from "../../../config";

import styles from "../../../styles/Home.module.css";
import Resolve from "../../../utils/Resolve";

const Card = ({ handshakename, visited, no }) => {
    const url = `http://${handshakename}.${config.domain}/`;
    
    const { rememberVisited, forgetVisited } = useContext(UserContext);
    
    const isPunycode = /\p{Extended_Pictographic}/u.test(handshakename);

    const customLinkHandler = e => {
        e.preventDefault();
        rememberVisited(handshakename);
        Resolve.resolve(handshakename);
    };

    return (
        <div className={styles.visitedWrapper}>
            <span    
                className={styles.visitedCard} 
                data-bg={no}
                onClick={e => { customLinkHandler(e) }}
            >
                <span>
                    {handshakename}/
                </span>
                {isPunycode&&<code>{punycode.toASCII(handshakename)}</code>}
            </span>
            <input
                type="button"
                name={`forget_${handshakename}`}
                className={styles.visitedForget}
                value="x"
                onClick={e => { forgetVisited(handshakename) }}
            />
            <span className={styles.visitedCounter}>
                visited: <code>{visited}</code>
            </span>
        </div>
   );
};
 
export default Card;