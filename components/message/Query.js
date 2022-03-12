import styles from "../../styles/Message.module.css";

const Popup = ( { google } ) => ( 
	<div className={styles.wrapper}>
		<div className={styles.content}>
			<p className={styles.title}>
				Google: "{google}"?
			</p>
		</div>
	</div>
);

export default Popup;