import Image from "next/image";

import styles from "../../styles/Matrix.module.css";
import hns_logo from "../../public/hns_white.png";

const Matrix = () => {
	return (

        <div className={[styles.Container]}>
			{/* <Image className={[styles.Logo]} src={hns_logo} alt="HNS LOGO" width={24} height={24} layout="fill" objectFit="contain" /> */}
		</div>
    );
};

export default Matrix;