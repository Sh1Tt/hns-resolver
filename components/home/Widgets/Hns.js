import { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/User';

import styles from '../../../styles/Home.module.css';

const Hns = () => {
    const initial = {
		state: {
			height: 0
		}
	};

	const { getBlockheight } = useContext(UserContext);

	const [height, setHeight] = useState(initial.state.height);
	
	useEffect(() => {
		const getHeight = async () => {
            const h = await getBlockheight();
            setHeight(h);
        };

        if (typeof window !== "undefined")
            getHeight();

	}, []);
	
    return (
        <div className={[styles.Widget__card]}>
            <span className={styles.Hns__title}>
                
            </span>
            <span className={styles.Hns__height}>
                Current block: {height}
            </span>
        </div>
    );
};

export default Hns;