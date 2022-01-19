import Link from "next/link";

import CMS from "../../cms";

import styles from "../../styles/Message.module.css";

const Message = ( { handshakename } ) => ( 
	<div className={styles.wrapper}>
		<div className={styles.content}>
			<p className={styles.title}>
				Σ（ﾟдﾟlll）Something went wrong.
			</p>
			<p>
				<span className={styles.name}>{handshakename}/</span> could not be resolved by {CMS.META.DOMAIN}.
			</p>
			<Link href="https://learn.namebase.io/starting-from-zero/how-to-access-handshake-sites">
				<a className={styles.link}>
					Please try another Handshake resolver..
				</a>
			</Link>
		</div>
	</div>
);

export default Message;