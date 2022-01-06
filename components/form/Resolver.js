import { useState } from 'react'

import v1 from '../../utils/Resolve'

import CMS from '../../cms/'

import styles from '../../styles/Resolver.module.css'

import stylesMsg from '../../styles/Message.module.css'

const Form = () =>
{
	const INITIAL = CMS.CONTENT.HOME.MESSAGE

	const [ handshakename, setHandshakename ] = useState( `` )

	const [ message, setMessage ] = useState( INITIAL )
	
	const showErrMsg = () =>
	{
		setMessage( `Σ（ﾟдﾟlll）Something went wrong. ${handshakename}/ could not be resolved by hns.is. Please try another Handshake resolver..` )

		setTimeout( () =>
		{ 
			setMessage( INITIAL )

		}, 15000 )

	}

	const removeTrailingSlash = n => n.endsWith( `/` ) ? n.slice( 0, -1 ) : n

	const resolve = async e =>
	{
		e.preventDefault()

		setMessage( `Resolving...` )

		if ( !handshakename || handshakename == '' || handshakename.indexOf( ` ` ) >= 0 ) 
		{
			showErrMsg()

		}
		else
		{
			try
			{
				v1( handshakename )

			}
			catch( err )
			{
				showErrMsg()

			}			
			
		}

		setTimeout( () => 
		{ 
			document.getElementById( `handshakename` ).value = ``
		}, 50 )

	}

	return (
		<>
			<form className={styles.resolver}>
				<input 
					className={styles.input}
					type="text" 
					id="handshakename"
					name="handshakename" 
					placeholder="Enter a handshake name (e.g. welcome.nb)" 
					onChange={e => setHandshakename( removeTrailingSlash( e.target.value ).toString() )}
				/>
				<button 
					className={styles.submit} 
					onClick={e => resolve( e )}
				>
					→
				</button>
			</form>
			<div className={stylesMsg.wrapper}>
				<p className={stylesMsg.content}>
					{message}
				</p>
			</div>
		</>
	)

}

export default Form