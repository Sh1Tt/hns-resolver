import { useContext } from "react";

import UserContext from "../../context/User";

import Card from "./Card";

import CMS from "../../../cms";

import styles from "../../../styles/Home.module.css";

const Visited = () => 
{
    const { userHistory } = useContext( UserContext );

    let handshakenames = userHistory ? [ ...userHistory.split( /,/ ).map( r =>  r.split( ":" )[0] ) ] : [];
    
    let visits =  userHistory ? [ ...userHistory.split( /,/ ).map( r => parseInt( r.split( ":" )[1] ) ) ] : [];

    return (
        <section className={styles.section}>
            <div>
                <h4 className={styles.sectionHeader}>
                    Top visited:
                </h4>
            </div>
            <div>
                <div className={styles.visitedShowcase}>
                    {handshakenames.length > 0 && handshakenames.filter( ( a, key ) => key <= 15 ).map( ( name, key ) => ( 
                        <Card
                            key={key} 
                            handshakename={name} 
                            visited={visits[ handshakenames.indexOf( name )]}
                            no={key}
                        />
                    ) )}
                </div>
            </div>
        </section>
    );
}

export default Visited;