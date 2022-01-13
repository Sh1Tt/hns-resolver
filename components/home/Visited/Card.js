import Link from 'next/link'

import { useContext } from 'react'

import punycode from 'punycode'

import UserContext from '../../context/User'

import config from '../../../config/domain'

import styles from '../../../styles/Home.module.css'

const Card = ( { handshakename, visited, no } ) => 
{
    const link = `https://${handshakename}.${config.domain}/`

    const { rememberVisited, forgetVisited } = useContext( UserContext )

    const isPunycode = handshakename.slice( 0, 4 ) == 'xn--'

    function customLinkHandler( e )
    {
        e.preventDefault()

        rememberVisited( handshakename )

        location.href = link

    }

    return (
        <div className={styles.visitedWrapper}>
            <Link href={link}>
                <a    
                    className={styles.visitedCard} 
                    data-bg={no}
                    onClick={e => { customLinkHandler( e ) }}
                >
                    {isPunycode ? 
                        <>
                            <span>
                                {punycode.toUnicode( handshakename )}/
                            </span>
                            <code>{handshakename}</code>
                        </>
                    : 
                        <h5>
                            <code>{handshakename}</code>/
                        </h5>
                    }

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

export default Card