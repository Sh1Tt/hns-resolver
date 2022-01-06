import { useState } from 'react'

import { v1, v2 } from '../../utils/Resolve'

import { valid, removeTrailingSlash } from '../../utils/Handshakename'

import CMS from '../../cms'

import styles from '../../styles/Resolver.module.css'

import stylesMsg from '../../styles/Message.module.css'

const Form = () =>
{
	const initialState = CMS.CONTENT.HOME.MESSAGE

	const [ handshakename, setHandshakename ] = useState( `` )

	const [ message, setMessage ] = useState( initialState )
	
	const errorMessage = () =>
	{
		setMessage( `
			Σ（ﾟдﾟlll）Something went wrong.
			${handshakename}/ could not be resolved by ${CMS.META.DOMAIN}. 
			Please try another Handshake resolver..
		` )

		setTimeout( () =>
		{ 
			setMessage( initialState )

		}, 15000 )

	}

	const resolve = async e =>
	{
		e.preventDefault()

		setMessage( `Resolving...` )

		if ( !handshakename || handshakename == '' || !valid( handshakename ) ) 
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
					onChange={e => setHandshakename( removeTrailingSlash( e.target.value ) )}
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