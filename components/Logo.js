import Link from "next/link";
import styles from "../styles/Logo.module.css";

const Logo = ({ text }) => {
	return (<>
		<div className={styles.wrapper}>
			<Link href="/">
			<a className={styles.logo}>
				<span 
					className={styles.text}
					
				>
					{text}
				</span>
			</a>
			</Link>
		</div>
	</>);
};

export default Logo;