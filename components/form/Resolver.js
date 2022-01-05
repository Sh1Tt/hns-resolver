import { useState } from 'react'

import v1 from '../../utils/Resolve'

import styles from '../../styles/Resolver.module.css'

const INITIAL_MESSAGE = "Surf the web using handshakenames.."

const Form = () =>
{
	const [ handshakename, setHandshakename ] = useState( `` )

	const [ message, setMessage ] = useState( INITIAL_MESSAGE )

	const errorMessage = () =>
	{
		setMessage( `Σ（ﾟдﾟlll）Something went wrong. ${handshakename}/ could not be resolved by hns.is. Please try another Handshake resolver..` )

		setTimeout( () => { setMessage( INITIAL_MESSAGE ) }, 15000 )

	}

	const removeTrailingSlash = n => n.slice( -1 ) === `/` ? n.slice( 0, -1 ) : n

	const resolve = async e =>
	{
		e.preventDefault()

		setMessage( `Resolving...` )

		if ( !handshakename || handshakename == '' || handshakename.indexOf( ` ` ) > 0 ) 
		{
			errorMessage()

		}
		else
		{
			try
			{
				v1( handshakename )

			}
			catch( err )
			{
				errorMessage()

			}			
			
		}

		setTimeout( () => { document.getElementById( `handshakename` ).value = `` }, 50 )

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
			<div className={styles.error}>
				<p className={styles.message}>
					{message}
				</p>
			</div>
		</>
	)

}

export default Form