import Link from 'next/link'

import Image from 'next/image'

import hnsLogo from '../public/favicon.png'

import styles from '../styles/Home.module.css'

const Footer = () => (
	<footer className={styles.footer}>
		<div className={styles.credits}>
			<Link href="https://twitter.com/angrymouse_hns">
				<a className={styles.credit}>
					<code>
						angrymouse
					</code>
					<p>
						/
					</p>
				</a>
			</Link>
			<Link href="https://handshake.org/">
				<a className={styles.credit}>
					<Image src={hnsLogo} width={22} height={22} alt="Handshake logo" />
					<h4>
						handshake
					</h4>
				</a>
			</Link>
			<Link href="https://vercel.com/">
				<a className={styles.credit}>
					<svg height="20" viewBox="0 0 75 65" fill="#FFF">
						<path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
					</svg>
					<h4>
						vercel
					</h4>
				</a>
			</Link>
		</div>
	</footer>
)

export default Footer