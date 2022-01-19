import styles from "../styles/Logo.module.css";

const Logo = ( { text } ) => (
	<div className={styles.wrapper}>
		<h2 className={styles.logo}>
			<span className={styles.text}>
				{text}
			</span>
		</h2>
	</div>
);

export default Logo;