import styles from "../../styles/Message.module.css";

const Message = ( { handshakename } ) => ( 
	<div className={styles.wrapper}>
		<div className={styles.content}>
			<p className={styles.title}>
				Resolving..
			</p>
		</div>
	</div>
);

export default Message;