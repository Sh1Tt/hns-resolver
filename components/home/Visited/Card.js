import { useContext } from "react";

import UserContext from "../../context/User";

import resolve_v2 from "../../../utils/Resolver";

import { hasEmoji,toAscii } from "../../../utils/Handshakename"

import styles from "../../../styles/History.module.css";

const Card = ( { handshakename, visited, no } ) => 
{
    const { rememberVisited, forgetVisited } = useContext( UserContext );

    const isPunycode = hasEmoji( handshakename );

    const customLinkHandler = e =>
    {
        e.preventDefault();

        rememberVisited( handshakename );

        resolve_v2( handshakename );

    }

    return (
        <div className={styles.topVisitedWrapper}>
            <span    
                className={styles.topVisitedCard} 
                data-bg={no}
                onClick={e => { customLinkHandler( e ) }}
            >
                {isPunycode ? handshakename : <div />}
                <span className={styles.topVisitedCounter}>
                    visited: <code>{visited}</code>
                </span>
            </span>
            <span 
                className={styles.topVisitedHandshakename}
                onClick={e => { customLinkHandler( e ) }}
            >
                {isPunycode ? toAscii( handshakename ) : handshakename}/
            </span>
            <input
                type="button"
                name={`forget_${handshakename}`}
                className={styles.topVisitedForget}
                value="x"
                onClick={e => { forgetVisited( handshakename ) }}
            />
        </div>
    );

}
 
export default Card;