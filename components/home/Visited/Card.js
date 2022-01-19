import Link from "next/link";

import { useContext } from "react";

import punycode from "punycode";

import UserContext from "../../context/User";

import config from "../../../config/domain";

import styles from "../../../styles/Home.module.css";

import { v1 } from "../../../utils/Resolve";

const Card = ( { handshakename, visited, no } ) => 
{
    const link = `http://${handshakename}.${config.domain}/`;

    const { rememberVisited, forgetVisited } = useContext( UserContext );

    const isPunycode = /\p{Extended_Pictographic}/u.test( handshakename );

    function customLinkHandler( e )
    {
        e.preventDefault();

        rememberVisited( handshakename );

        v1( handshakename );

    }

    return (
        <div className={styles.visitedWrapper}>
            <Link href={link}>
                <a    
                    className={styles.visitedCard} 
                    data-bg={no}
                    onClick={e => { customLinkHandler( e ) }}
                >
                        <>
                            <span>
                                {handshakename}/
                            </span>

                            {isPunycode && <code>{punycode.toASCII( handshakename )}</code>}
                        </>
                </a>
            </Link>
            <input
                type="button"
                name={`forget_${handshakename}`}
                className={styles.visitedForget}
                value="x"
                onClick={e => { forgetVisited( handshakename ) }}
            />
            <span className={styles.visitedCounter}>
                visited: <code>{visited}</code>
            </span>
        </div>
    )
}
 
export default Card;